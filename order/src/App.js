import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchbar';
import CardList from './components/cardList';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <CardList/>
    </div>
  );
}

export default App;
