class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {status: false}
  }

  button(){
    return (
      <button>Button here</button>
    )
  }

  click() {
    if (this.state.status){
      this.setState({status: false})
      var text = "menu"+this.props.index
      document.getElementById(text).style.display = "none"
    }else{
      this.setState({status: true})
      var text = "menu"+this.props.index
      document.getElementById(text).style.display = "block"
      document.addEventListener("click",function echo(e, callback){
        console.log("blurring")
        console.log(e.target.id)
        if (e.target.id != text){
          document.getElementById(text).style.display = "none"
          document.removeEventListener('click',echo)
        }
      })
    }
  }

  show() {
    var text = "img"+this.props.index
    document.getElementById(text).style.display = "block"
  }

  hide(obj) {
    var text = "img"+this.props.index
    document.getElementById(text).style.display = "none"
  }


  render() {
    return (
      <li style={{listStyleType:"none"}}>
      <div style={{display:"flex", position:"relative", flexDirection:"row", alignItems:"center", border:"1px solid black", borderRadius:25+"px"}}>
        <div>
          <img src={this.props.profilepic} style={{borderRadius:25+"px"}} onMouseEnter={this.show.bind(this)} onMouseLeave={this.hide.bind(this)}/>
          <img id={"img"+this.props.index} src={this.props.profilepic} style={{display:"none"}}/>
        </div>
        <div>
        <p>{this.props.username} said</p>
        <p>{this.props.text}</p>
        </div>
        <div style={{position:"absolute", top:10+"px", right:20+"px"}}>
        <span id={this.props.index} onClick={this.click.bind(this)}>X</span>
        <div id={"menu"+this.props.index} style={{display:"none", backgroundColor:"gray", border:"1px solid black", zIndex:"5"}}>
        <a href="#">Copy Link</a>
        <a href="#">Embed Link</a>
        </div>
        <div className="dialog-box" name={this.props.index} style={{width: 100+"px", visibility:"hidden", border:"1px solid red", position:"absolute", top:10+"px", right:10+"px"}}>
          <a>Copy Link</a><br/>
          <a>Embed Tweet</a>
        </div>
        </div>
      </div>

      </li>
    )
  }
}

class Toggle extends React.Component {
  constructor (props){
    super(props)
    this.state = {status:false}
  }

  click() {
    if (this.state.status){
      this.setState({status: false})
      return <h1>Something</h1>
    }else{
      this.setState({status: true})
      return <h1>Not Something</h1>
    }
  }
  render() {
    return (
      true
    )
  }
}



class Entities extends React.Component {
  render() {
    console.log(this.props.tweets)
    var usertweets = this.props.tweets.map((obj, index)=>{
      return <User username={obj.user.name} text={obj.text} index={index} key={index} profilepic={obj.user.profile_image_url}/>
    })
    return (
      <ul>
        {usertweets}
      </ul>
    )
  }
}



var monkey = "hello";
ReactDOM.render(
    <Entities tweets={tweets}/>,
    document.getElementById('root')
);

var selectedDiv;

function runThis(e){
  e.preventDefault()
  var x = document.getElementsByName(e.target.id)
  for (var i = 0; i < x.length; i++){
    if (x[i].style.visibility === "visible"){
      x[i].style.visibility = "hidden"
      selectedDiv = ""
    }else {
      x[i].style.visibility = "visible"
      selectedDiv = x[i].id
    }
  }
}
