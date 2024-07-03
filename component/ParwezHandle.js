import { useState } from "react";
import Label from "./Label";
import { Button, Input, TableHeading } from "./showListData";
import  ButtonWV from '../pages/components/Button';
import { ConnectToAPI } from "./ConnectToAPI";
import NotAvailable from "./notAvailable";
import { useSelector } from "react-redux";
import NotFound from "../pages/404";
import Link from "next/link";
import LoadingData from "./LoadingData";
import { Text_speech } from "./text-speech";

export default function ParwezHandle() {
  const [valid, setValid] = useState();
  const [showListIdBased, setShowListIdBased] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [namazData, setNamazData] = useState([]);
  const [selected, setSelected] = useState();
  const [receivedSelected, setReceivedSelected] = useState();
  const [showList, setShowList] = useState([]);
  const [addedListData, setAddedListData] = useState([]);
  const [addedListDataIn, setAddedListDataIn] = useState([]);
  const [a_salary, setSalary] = useState();
  const [a_salary_month, setSalary_month] = useState();
  const [namazUpdateEffect, setNamazUpdateEffect] = useState();

  const dispatchValue = useSelector((state) => state.loginUserName);

  async function temporaryAddHandle(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    setData((prevItems) => {
      return prevItems.concat(formData);
    });
  }

  function removeHandle(id) {
    setData((prev) => {
      return prev.filter((items, index) => id != index);
    });
  }

  async function removeAllData(val) {
    // namaz
    if (val === "namaz") {
      setLoading(true);
      const result = await ConnectToAPI("findData", "", "namaz", "PUT");
      if (result) {
        setNamazData(result.message);
        setLoading(false);
      }
    }
    setLoading(false);
    setSelected(val);
    setValid(false);
    setData((prev) => {
      return prev.filter((items, index) => 0 != 0);
    });

    if (val === "received_bagahi") {
      setLoading(true);
      const result = await ConnectToAPI(
        "findData",
        "data",
        "received_bagahi",
        "PUT"
      );
      const result1 = await ConnectToAPI(
        "findData",
        "data",
        "received_bagahi_in",
        "PUT"
      );
      if (result1 && result) {
        setAddedListData(result.message);
        setAddedListDataIn(result1.message);
        setLoading(false);
      } else {
        console.log("sorry");
      }
    }
  }

  async function addHandle(collect) {

    setLoading(true);
    setSelected(false);
    const res = await ConnectToAPI("addData", data, collect, "POST");
    if (res.message) {
      Text_speech(" adding successfully");
      setLoading(false);
      setValid(true);
      setSelected(false);
    } else {
      setLoading(false);
      setValid(false);
    }

  }

  function showDetails(information) {
    if (information == showListIdBased) {
      setShowListIdBased(0);
    } else {
      setShowListIdBased(information);
      setShowList(addedListDataIn.filter((ele) => ele.userId === information));
    }
  }
  //  in namaz concept here
  async function namazUpdateHandle(event) {
    setLoading(true);
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const result1 = await ConnectToAPI("updateData", formData, "namaz", "POST");
    if (result1.message) {
      setLoading(false);
      Text_speech("namaz timing update successfully");
      setNamazUpdateEffect(0);
      const result = await ConnectToAPI("findData", "", "namaz", "PUT");
      if (result) {
        setNamazData(result.message);
      }
    }
  }
  // amam handle
  async function amamSalaryHandle() {
    // chech userid is all ready inserted
    setLoading(true);
    setSelected(false);
    if (a_salary_month.length !== 0) {
      const result = await ConnectToAPI(
        "findData",
        a_salary_month,
        "amam_salary",
        "POST"
      );
      if (result.message.length === 0) {
        await ConnectToAPI(
          "addData",
          [{ salary: a_salary, salary_month: a_salary_month }],
          "amam_salary",
          "POST"
        );
      }
    }
    const res = await ConnectToAPI("addData", data, "amam", "POST");
    if (res.message) {
      Text_speech(" adding successfully");
      setLoading(false);
      setValid(true);
      setSelected(false);
    } else {
      setLoading(false);
      setValid(false);
    }
  }

  return (
    <div className="bg-green-300 p-3 w-auto text-xl">
      {dispatchValue.length !== 0 ? (
        <div>
          <h1> only for perwez alam </h1>
          <div>
            <Label id="select" label="select option" />
            <select
              onChange={(event) => removeAllData(event.target.value)}
              id="select"
              required
              className="w-100 h-8 text-red-400 text-2xl"
            >
              <option>select</option>
              <option value="received_bagahi">received bagahi</option>
              <option value="uses_amount">uses amount</option>
              <option value="adding">add new name </option>
              <option value="amam">amam shahab </option>
              <option value="namaz">nemaz</option>
            </select>
          </div>
          {loading && <LoadingData/>}
          {valid && !loading && !selected && <h1 className="text-xl text-red-400">adding successfully </h1>}

          {(selected === "adding" || selected === "uses_amount") && (
            <div>
              {selected === "adding" ? (
                <h1> welcome to new adding information </h1>
              ) : (
                <h1> welcome to uses information</h1>
              )}

              {data.length !== 0 && (
                <table className="border-separate border-spacing-4">
                  <TableHeading data={["name", "amount", "date", "remove"]} />
                  {data.map((items, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{items.name}</td>
                      <td>{items.amount}</td>
                      <td>{items.date}</td>
                      <td>
                      <ButtonWV name="remove" clickEffectHandle={()=>removeHandle(index)}/>
                      </td>
                    </tr>
                  ))}
                </table>
              )}
              {selected !== "uses_amount" && (
                <div>
                  <Label id="select1" label="select option" />
                  <select
                    onChange={(event) =>
                      setReceivedSelected(event.target.value)
                    }
                    id="select1"
                    name="select1"
                    required
                    className="w-100 h-8 text-red-400 text-2xl"
                  >
                    <option> select</option>
                    <option value="received_bagahi"> bagahi</option>
                    <option value="received_other"> other</option>
                  </select>
                </div>
              )}

              <div>
                <form onSubmit={temporaryAddHandle}>
                  <Input type="text" name="name" label="enter name" />
                  <Input type="number" name="amount" label="enter amount" />
                  <Input
                    type="date"
                    name="date"
                    label="enter date (day/month/year)"
                  />
                  <Button name="add" />
                </form>
              </div>
              {data.length!==0 && selected=="uses_amount" ? (
                 <ButtonWV name=" final submit" clickEffectHandle={()=>addHandle("uses_amount")}/>
              ) : data.length!==0 && receivedSelected ? (
                <ButtonWV name=" final submit" clickEffectHandle={()=>addHandle(receivedSelected)}/>
              ) : (
                ""
              )}
            </div>
          )}
          {selected === "received_bagahi" && (
            <div>
              <h1>welcome to received bagahi </h1>
              {addedListData.length !== 0 && (
                <table className="border-separate border-spacing-x-4">
                  <TableHeading data={["name", "amount", "date", "view"]} />
                  {addedListData.map((items, index) => (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{items.name}</td>
                        <td>{items.amount}</td>
                        <td>{items.date}</td>
                        <td>
                        <ButtonWV name={items._id === showListIdBased ? "Hide" : "Show"} clickEffectHandle={()=>showDetails(items._id)}/>
                        </td>
                      </tr>   
                      {items._id === showListIdBased &&(
                        showList.length !== 0? (
                          showList.map((items1, index) => (
                            <tr>
                              <td></td>
                              <td>{index + 1}</td>
                              <td>{items1.amount}</td>
                              <td>{items1.date}</td>
                            </tr>
                          ))
                        ) : <tr><td></td> <td>{<NotAvailable/>}</td></tr>
                      )
                      } 
                    
                      {data.length !== 0 && items._id ===showListIdBased &&(
                            data.map((items2, index) => (
                              <tr>
                                <td></td>
                                <td>{index + 1}</td>
                                <td>{items2.amount}</td>
                                <td>{items2.date}</td>
                                <td><ButtonWV name="remove" clickEffectHandle={()=> removeHandle(index)}/></td>
                              </tr>
                            ))                           
                        )}

                     
                       { items._id ===showListIdBased &&
                        <tr>
                         <td>
                         <form onSubmit={temporaryAddHandle}>
                          <Input type="number" name="amount" label="amount" />
                          <Input type="date" name="date" label=" date" />
                          <input
                            type="text"
                            name="userId"
                            id="userId"
                            value={items._id}
                            hidden
                          />
                          <Button name="add" />
                        </form>
                        {data.length != 0 && (
                           <ButtonWV name="final submit" clickEffectHandle={()=> addHandle("received_bagahi_in")}/>
                        )}

                      </td>
                      </tr>
                      }
                     

                    </tbody>

                  ))}
                </table>
              )}
            </div>
          )}

          {selected === "amam" && !loading && (
            <div className="text-xl">
              <h1> welcome to amam information </h1>

              <div className="my-3">
                <input className="mb-2"
                  type="number"
                  name="salary"
                  placeholder="salary"
                  onChange={(event) => setSalary(event.target.value)}
                /><br/>
                <input
                  type="date"
                  name="date"
                  placeholder="salary month"
                  onChange={(event) => setSalary_month(event.target.value)}
                />
              </div>

              <div>
                {data.length !== 0 && (
                  <table className="border-separate border-spacing-4">
                    <TableHeading data={["name", "amount", "date", "delete"]} />
                    {data.map((items, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{items.name}</td>
                        <td>{items.amount}</td>
                        <td>{items.date}</td>
                        <td>
                        <ButtonWV name="remove" clickEffectHandle={()=>removeHandle(index)}/>
                        </td>
                      </tr>
                    ))}
                  </table>
                )}
                <form onSubmit={temporaryAddHandle}>
                  <Input type="text" name="name" label="name" />
                  <Input type="number" name="amount" label="amount" />
                  <Input type="date" name="date" label="date" />
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={a_salary_month}
                    hidden
                  />
                  {a_salary_month && a_salary ? (
                    <Button name="add" />
                  ) : (
                    <h1 className="text-2xl text-red-400">please select salary & salary month</h1>
                  )}
                </form>
                {data.length !== 0 && (
                  <ButtonWV name="final submit" clickEffectHandle={amamSalaryHandle}/>
                )}
              </div>
            </div>
          )}

          {selected === "namaz" && (
            <div>
              <h1 >welcome to namaz information </h1>

              <div>
                {namazData.length !== 0 && (
                  <div>
                    <table className="border-separate border-spacing-4">
                      <TableHeading
                        data={[
                          "namaz",
                          "azan",
                          "jamat",
                          "update",
                        ]}
                      />
                      {namazData.map((items, index) => (

                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{items.name}</td>
                          <td>{items.time}</td>
                          <td>{items.time1}</td>
                          <td>
                          <ButtonWV name="update" clickEffectHandle={()=>setNamazUpdateEffect(items._id)}/>
                          </td>
                        </tr>  
                          {namazUpdateEffect === items._id && (
                            <tr>
                              <td className="col-span-3 ..." >
                                <form onSubmit={namazUpdateHandle}>
                                  <Input
                                    type="time"
                                    name="time"
                                    label="azan time"
                                  />
                                  <Input
                                    type="time"
                                    name="time1"
                                    label="jamat time"
                                  />
                                  <input
                                    type="text"
                                    name="id"
                                    id="id"
                                    value={items._id}
                                    hidden
                                  />
                                  <Button name="save" />
                                </form>
                              </td>
                            </tr>
                          )}
                        
                      </tbody> 
                      ))}
                    </table>
                  </div>
                )}
              </div>

              {data.length !== 0 && (
                <table className="border-separate border-spacing-4">
                  <TableHeading data={["namaz", "azan", "jamat", "remove"]} />
                  {data.map((items, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{items.name}</td>
                      <td>{items.time}</td>
                      <td>{items.time1}</td>
                      <td>
                      <ButtonWV name="remove" clickEffectHandle={()=> removeHandle(index)}/>
                      </td>
                    </tr>
                  ))}
                </table>
              )}
              <form onSubmit={temporaryAddHandle}>
                <Input type="text" name="name" label="nemaz name" />
                <Input type="time" name="time" label="azan time" />
                <Input type="time" name="time1" label="jamat time" />
                <Button name="add" />
              </form>
              {data.length != 0 && (
                <ButtonWV name=" final submit" clickEffectHandle={()=> addHandle(selected)}/>
              )}
            </div>
          )}
        </div>
      ) : (
        <NotFound />
      )}
      <br />{" "}
      <Link href="/">
        <Button name="Home" />
      </Link>
    </div>
  );
}
