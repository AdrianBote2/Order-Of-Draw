import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchbar';
import CardList from './components/cardList';
import CardButton from './components/cardButton';
import Chart from './components/chart';
import Logo from './components/logo';



function App() {
  return (
    <div className="App">
        <div className='leftCol'>
          <Logo />
          <SearchBar />
          <CardList className="card-list-item"/>
          <div>
            <CardButton className="addButton" title="+" onClick={() => alert('Card 1 clicked!')} />
          </div>
        </div>
        <div className='rightCol'>
          <Chart />
          <div>
            <CardButton className="startButton" title="Start" onClick={() => alert('Card 1 clicked!')} />
          </div>
        </div>
      
    </div>
  );
}

export default App;
