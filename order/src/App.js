import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchbar';
import CardList from './components/cardList';
import Chart from './components/chart';


function App() {
  return (
    <div className="App">
      <SearchBar />
      <CardList/>
      <Chart />
    </div>
  );
}

export default App;
