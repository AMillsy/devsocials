import "./Aside.css"

const Developers = ({ name,picture,id }) => {
    console.log(picture)
    return (<div className="devCon">
    <img src={picture} className="photo" />
    <h2>{name}</h2>
    </div>

  )};
  
  
  export default Developers;