import { useEffect, useState } from "react";
import { BarChartComponent } from "../components/ui/BarChartComponent";
import { LineChartComponent } from "../components/ui/LineChartComponent";
import { filter } from "../utils/filter";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [dataFromBe, setDateFromBe] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "",
    endDate: "",
    age: "",
    gender: "",
  });

  const [date, setDate] = useState({});

  const [category, setCategory] = useState("A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://insight-scope-zkm6.vercel.app/api/data"
        );
        const json = await response.json();
        setDateFromBe(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // console.log(dataFromBe);

  const handleDropDownAge = (value) => {
    setSearchParams((prev) => {
      prev.set("age", value);
      return prev;
    });
  };
  const handleDropDownGender = (value) => {
    setSearchParams((prev) => {
      prev.set("gender", value);
      return prev;
    });
  };

  const dateRange = {
    startDate: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate"))
      : date.from,
    endDate: searchParams.get("endDate")
      ? new Date(searchParams.get("endDate"))
      : date.to,
  };

  const ageParams = searchParams.get("age");

  const genderParams = searchParams.get("gender");

  const handleFilter = () => {
    let result = filter(dataFromBe, dateRange, ageParams, genderParams);
    setFilteredData(result);
  };

  useEffect(() => {
    handleFilter();
  }, [JSON.stringify(dateRange), ageParams, genderParams, dataFromBe]);

  // console.log(filteredData);

  return (
    <>
      <div>
        <div className="flex justify-center space-x-6 my-10">
          <Calendar
            captionLayout="dropdown"
            defaultMonth={new Date(2022, 9)}
            mode="range"
            selected={date}
            onSelect={(range) => {
              setDate(range);
              if (range?.from && range?.to) {
                setSearchParams(
                  (prev) => {
                    prev.set("startDate", range.from);
                    prev.set("endDate", range.to);
                    return prev;
                  },
                  { replace: true }
                );
              }
            }}
            className="rounded-md border"
          />
        </div>

        <div className="flex space-x-4 justify-center my-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Age {ageParams ? "is " + ageParams : ""}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-md bg-white shadow-lg border border-gray-200">
              <DropdownMenuItem
                onClick={() => handleDropDownAge("15-25")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                15-25
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDropDownAge(">25")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                &gt; 25
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Gender {genderParams ? "is " + genderParams : ""}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-md bg-white shadow-lg border border-gray-200">
              <DropdownMenuItem
                onClick={() => handleDropDownGender("Male")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Male
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDropDownGender("Female")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Female
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 m-10 sm:space-x-6 sm:space-y-0 space-y-4 mt-8 mb-12">
        {filteredData ? (
          <>
            <BarChartComponent
              className="col-span-6"
              data={filteredData}
              setCategory={setCategory}
            />
            <LineChartComponent
              className="col-span-6"
              data={filteredData}
              category={category}
            />
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
};

export default Home;
