export default function ButtonWV({name,clickEffectHandle}){
    return  <button className="p-1 mr-5 my-1 bg-red-200 text-lg rounded-xl border-red-500 active:bg-blue-400 hover:bg-blue-900" onClick={clickEffectHandle}>{name}</button>
}