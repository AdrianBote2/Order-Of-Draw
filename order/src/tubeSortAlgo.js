/** 
 * Phlebotomist Tube Sorting Algorithm
 * 
 * This algorithm sorts blood collection tubes according to the standard
 * order of draw, identifies duplicates, and counts quantities of each tube type.
 */

// Standard order of draw for blood collection tubes
const ORDER_OF_DRAW = [
    'white', 
    'lightblue', 
    'red',
    'orange',
    'lightgreen',
    'darkgreen',
    'lavendar',
    'gray',
    'yellow'
  ];
  
  /**
   * Sorts blood tubes according to the order of draw and counts quantities
   * @param {string[]} tubes - Array of tube colors
   * @returns {Object[]} Array of objects with tube color and quantity
   */
  function sortBloodTubes(tubes) {
    // Create a map to count each tube type
    const tubeCounts = {};
    tubes.forEach(tube => {
      tubeCounts[tube] = (tubeCounts[tube] || 0) + 1;
    });
    
    // Sort tubes based on the order of draw
    const result = [];
    
    // Add tubes in the correct order, only if they exist in the input
    ORDER_OF_DRAW.forEach(color => {
      if (tubeCounts[color]) {
        result.push({
          color: color,
          quantity: tubeCounts[color]
        });
      }
    });
    
    return result;
  }
  
  /**
   * Extended version with discharge tube logic
   * @param {string[]} tubes - Array of tube colors
   * @returns {Object[]} Array of objects with tube color, quantity, and discard info
   */
  function sortBloodTubesWithDiscards(tubes) {
    // Initial sort
    const sortedTubes = sortBloodTubes(tubes);
    
    // Check for various conditions requiring discharge tubes
    let hasRedTube = false;
    let hasLightBlue = false;
    let hasLavender = false;
    let hasYellow = false;
    let needsDischarge = false;
    
    // Check presence of specific tubes
    sortedTubes.forEach(tube => {
      if (tube.color === 'red') {
        hasRedTube = true;
      }
      if (tube.color === 'lightblue') {
        hasLightBlue = true;
      }
      if (tube.color === 'lavendar') {
        hasLavender = true;
      }
      if (tube.color === 'yellow') {
        hasYellow = true;
      }
    });
    
    // If the list includes lightblue, lavender, or yellow, we need a discharge tube
    if (hasLightBlue || hasLavender || hasYellow) {
      needsDischarge = true;
    }
    
    // Prepare result with discharge tube if needed
    const result = [];
    
    // Check if white exists in the sorted tubes
    const hasWhite = sortedTubes.some(tube => tube.color === 'white');
    const whiteIndex = sortedTubes.findIndex(tube => tube.color === 'white');
    
    // Add tubes with proper discharge tube placement
    if (needsDischarge && !hasRedTube) {
      const dischargeTube = {
        color: 'red',
        quantity: 1,
        isDischarge: true
      };
      
      if (hasWhite) {
        // Add white tube first
        result.push(sortedTubes[whiteIndex]);
        // Then add the discharge tube as the second position
        result.push(dischargeTube);
        // Add remaining tubes (excluding white which was already added)
        sortedTubes.forEach((tube, index) => {
          if (index !== whiteIndex) {
            result.push(tube);
          }
        });
      } else {
        // If no white exists, add red discharge to the front
        result.push(dischargeTube);
        // Then add all other tubes
        sortedTubes.forEach(tube => {
          result.push(tube);
        });
      }
    } else {
      // No discharge needed, just add all tubes in order
      sortedTubes.forEach(tube => {
        result.push(tube);
      });
    }
    
    return result;
  }
  
  /**
   * Identifies duplicate colors in the tube array
   * @param {string[]} tubes - Array of tube colors
   * @returns {Object} Object containing duplicate info and count
   */
  function identifyDuplicates(tubes) {
    const tubeCounts = {};
    const duplicates = [];
    
    // Count occurrences of each tube color
    tubes.forEach(tube => {
      tubeCounts[tube] = (tubeCounts[tube] || 0) + 1;
    });
    
    // Identify which colors have duplicates
    Object.entries(tubeCounts).forEach(([color, count]) => {
      if (count > 1) {
        duplicates.push({
          color,
          count
        });
      }
    });
    
    return {
      hasDuplicates: duplicates.length > 0,
      duplicates: duplicates
    };
  }
  
  /**
   * Combine multiple test orders into a single optimized draw
   * @param {Array<Object>} testOrders - Array of test order objects, each with a tubes array
   * @returns {Object} Combined and optimized tube order with duplicate information
   */
  function combineTestOrders(testOrders) {
    // Collect all tubes from all test orders
    const allTubes = [];
    testOrders.forEach(order => {
      if (Array.isArray(order.tubes)) {
        allTubes.push(...order.tubes);
      }
    });
    
    // Identify duplicates in the combined list
    const duplicateInfo = identifyDuplicates(allTubes);
    
    // Sort the combined tubes with discharge tube logic
    const sortedWithDiscards = sortBloodTubesWithDiscards(allTubes);
    
    return {
      sortedTubes: sortedWithDiscards,
      duplicateInfo: duplicateInfo
    };
  }
  
  /**
   * Process blood test JSON data for frontend use
   * @param {Object} jsonData - JSON data with tubes property containing array of colors
   * @returns {Object} Processed data with various sorting options and metadata
   */
  function processBloodTestJson(jsonData) {
    // Ensure tubes property exists
    const tubes = jsonData.tubes || [];
    
    // Get duplicate information
    const duplicateInfo = identifyDuplicates(tubes);
    
    // For basic sorting without discharge logic
    const sortedTubes = sortBloodTubes(tubes);
    
    // For advanced sorting with discharge logic
    const sortedWithDiscards = sortBloodTubesWithDiscards(tubes);
    
    // Create frontend-friendly output object
    return {
      basic: sortedTubes,
      withDiscards: sortedWithDiscards,
      tubeCount: tubes.length,
      duplicateInfo: duplicateInfo,
      totalTubesAfterCombining: sortedTubes.reduce((sum, tube) => sum + tube.quantity, 0)
    };
  }
  
  // Example for testing
  const exampleJson = {
    "tubes": ["white", "yellow", "darkgreen", "lightblue", "orange", "lavendar", "lightblue"]
  };
  
  console.log(processBloodTestJson(exampleJson));
  
  // Multiple test order example
  const multipleTestOrders = [
    { tubes: ["white", "yellow", "lightblue"] },
    { tubes: ["darkgreen", "lightblue", "orange"] },
    { tubes: ["lavendar", "yellow"] }
  ];
  
  console.log(combineTestOrders(multipleTestOrders));
  
  // Export functions for use in frontend
  module.exports = {
    sortBloodTubes,
    sortBloodTubesWithDiscards,
    identifyDuplicates,
    combineTestOrders,
    processBloodTestJson,
    ORDER_OF_DRAW
  };