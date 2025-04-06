/** 
 * Phlebotomist Tube Sorting Algorithm
 * 
 * This algorithm sorts blood collection tubes according to the standard
 * order of draw and counts quantities of each tube type.
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
  
  // Example usage
  function processBloodTestJson(jsonData) {
    // Assuming jsonData has a property 'tubes' that contains the array of colors
    const tubes = jsonData.tubes;
    
    // For basic sorting without discharge logic
    const sortedTubes = sortBloodTubes(tubes);
    
    // For advanced sorting with discharge logic
    const sortedWithDiscards = sortBloodTubesWithDiscards(tubes);
    
    return {
      basic: sortedTubes,
      withDiscards: sortedWithDiscards
    };
  }
  
  // Example for testing
  const exampleJson = {
    "tubes": ["white","yellow", "darkgreen", "lightblue", "orange", "lavendar"]
  };
  
  console.log(processBloodTestJson(exampleJson));
  
  // Export functions for use in other modules
  module.exports = {
    sortBloodTubes,
    sortBloodTubesWithDiscards,
    processBloodTestJson
  };
  