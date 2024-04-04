import { CgDarkMode } from "react-icons/cg";
import { BiDollar } from "react-icons/bi";
import { IoMdPeople } from "react-icons/io";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Billsplit = () => {
  const [totalbill, setTotalbill] = useState("");
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState([]);
  const [percentages, setPercentages] = useState({});

  const calculateSplit = (data) => {
    const peopleList = data.people.split(",").map((name) => name.trim());
    setPeople(peopleList);

    const amount = parseFloat(data.amount);
    setTotalbill(amount);
    console.log(totalbill);

    const perPersonBill = amount / peopleList.length;
    setBill(perPersonBill);

    const percentages = {};
    for (const person of peopleList) {
      percentages[person] = parseFloat(data[person]);
    }
    setPercentages(percentages);
  };

  const { register, handleSubmit } = useForm();
  const [collapse, setCollapse] = useState(true);

  return (
    <div className="w-full bg-[#D1FAE5] h-screen flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded p-4">
        <div className="flex items-center justify-between pb-4">
          <span className="font-custome font-semibold text-2xl">Splitx</span>
          <CgDarkMode className="w-8 h-8" />
        </div>
        <form onSubmit={handleSubmit(calculateSplit)}>
          <div className="flex flex-col gap-2">
            <label className="font-custome text-sm font-medium">Bill</label>
            <div className="flex items-center justify-between h-10 border p-2 rounded text-xs font-semibold">
              <input
                {...register("amount")}
                type="text"
                placeholder="Enter Bill Amount"
                className="outline-none"
              />
              <BiDollar />
            </div>
            <label className="font-custome text-sm font-medium">People</label>
            <div className="flex items-center justify-between h-10 border p-2 rounded text-xs font-semibold ">
              <input
                {...register("people")}
                type="text"
                placeholder="Enter Names separated by comma"
                className="outline-none w-full"
              />
              <IoMdPeople />
            </div>
            <div className="pt-3 flex justify-end pb-2">
              <button className=" w-32 bg-lime-300 rounded h-8 text-xs font-custome font-semibold hover:bg-lime-400">
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full">
            {people.map((person, idx) => (
              <div key={idx}>
                <li className="list-none font-custome text-xs font-medium justify-between p-2 items-center grid grid-cols-4 gap-4 w-full">
                  {person.toUpperCase()}:<div>${totalbill}</div>
                  <div className="flex items-center border max-w-9 px-1">
                    <input
                      {...register(person)}
                      type="text"
                      className="outline-none w-full max-w-9"
                    />
                    <FaPercent />
                  </div>
                  <span className="font-custome text-xs font-medium">
                    $ {Math.floor((percentages[person] / 100) * totalbill || 0)}
                  </span>
                </li>
              </div>
            ))}
            <div className="flex justify-end">
              <button className="bg-lime-300 hover:bg-lime-400 text-xs font-custome font-semibold rounded max-w-12 w-full h-5 ">
                Get
              </button>
            </div>
          </div>
        </form>
        <div className="pt-2">
          <div
            className="flex items-center justify-between w-full hover:cursor-pointer bg-lime-300 rounded rounded-bl-none rounded-br-none p-2"
            onClick={() => setCollapse(!collapse)}
          >
            <div className="felx flex-col">
              <span className="font-custome font-bold text-sm">${bill}</span>
              <p className="font-custome font-medium text-xs text-black">
                Total per person
              </p>
            </div>
            {collapse ? <MdExpandMore /> : <MdExpandLess />}
          </div>
          {!collapse && (
            <div
              className={`flex overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <div className="overflow-hidden bg-lime-300  w-full rounded-t-none rounded-tr-none rounded">
                <div className="flex flex-col p-2 ">
                  <sapn className="font-custome text-xs font-semibold">
                    Total
                  </sapn>
                  <sapn className="font-custome text-xs font-semibold">
                    Bill
                  </sapn>
                  <sapn className="font-custome text-xs font-semibold">
                    {" "}
                    Tip
                  </sapn>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
