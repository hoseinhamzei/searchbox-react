// JSX Document
const container = document.getElementById('react-container');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.oninputchange = this.oninputchange.bind(this);
    this.onboxchecked = this.onboxchecked.bind(this);
    this.updateResults = this.updateResults.bind(this);

    this.state = {value:'', stock:false, list:[]};
  }


  /////////


  oninputchange(text){
    this.setState({value:text});
    this.updateResults();
  }


  /////////

  onboxchecked(check){
    if(check){
      this.setState({stock:true});
    } else {
      this.setState({stock:false});
    }

    this.updateResults();
  }


  //////////

  updateResults(){

    

    

    $.getJSON('test.json',function(data){
      var texttosearch = this.state.value;
      var onlyinstock = this.state.stock;
      var newlist = [];
      var jsonArr = data.products;
      jsonArr.forEach(item => {
      
      if(onlyinstock){
        if(item.name.includes(texttosearch) && item.stocked){
          newlist.push(item);
          
        }
      } else {
        if(item.name.includes(texttosearch)){
          newlist.push(item);
          
        }
      }
      });

      
      this.setState({list:newlist});
      console.log(newlist);

    }.bind(this));

    
    
    


  }


  ////////

  render() {
    const mainlist = this.state.list;
    const prodlist = mainlist.map((item,index) => <li key={index} className={item.stocked ? 'row mt-3' : 'row nostock mt-3'}><p>{item.name}  </p>  <p className='ml-5'>{item.category}  </p>  <p className='ml-5'>{item.price}  </p></li>);
    return ( 
      <div className='p-5'>
        <Inputbox onchange={this.oninputchange} oncheck={this.onboxchecked}/>
        <br></br>
        search "{this.state.value}" in {this.state.stock ? 'only in stock' : 'all'} products.
        <ul className='mt-5'>
        <li className='row mt-3'><h5>NAME</h5>  <h5 className='ml-5'>CATEGORY</h5>  <h5 className='ml-5'>PRICE</h5></li>
          {prodlist.length > 0 ? prodlist : 'no products found please search again'}
        </ul>
      </div>
      );
  }


  componentDidMount() {
    this.updateResults();
  }



}


/////////////////////////////////////////////////////////////////////////////////////




class Inputbox extends React.Component {
  constructor(props) {
    super(props);
    this.handlechange = this.handlechange.bind(this);
    this.handlecheck = this.handlecheck.bind(this);
  }

  handlechange(e){
    this.props.onchange(e.target.value);
  }

  handlecheck(e){
    this.props.oncheck(e.target.checked);
  }


  render() { 
    return (
      <div>
        <input className='form-control' type='text' value={this.props.value} placeholder='enter product name to search' onChange={this.handlechange} />
        <br></br>
        <input className='mt-2' type="checkbox" name="chk" value="instock" onChange={this.handlecheck} /> only show products in stock
      </div>
      );
  }
}


 

 




























function renderApp(){
    ReactDOM.render(<App/>,container)
}


renderApp();


