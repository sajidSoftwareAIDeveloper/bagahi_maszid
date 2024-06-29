export default function Label({id,label}){
    return <label htmlFor={id} className="text-xl">{label}</label>
}