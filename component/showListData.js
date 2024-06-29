import Label from "./Label"
export function TableData({data}){

  return <tr>
    {
      data.map(index=>{
        <td>{data[index]}</td>
      })
    }  
  </tr>
}
export function TableHeading({data}){

    return <thead className="text-red-400 text-2xl">
      <tr>
    <th>sn.</th>
    {  data.map((items)=>(<th>{items}</th>)) }

</tr></thead>
}

export function Input({name,type,label}){
  return <div>
    <Label label={label}/> <br/>
    <input type={type} name={name} id={name} required className="rounded-xl p-1 mb-2 text-green-500"/>
  </div>
}
export function Button({name}){
  return<div>
    <button className="rounded-2xl bg-red-300 text-xl p-1 px-4">{name}</button>
  </div>
}