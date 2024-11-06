import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AboutDashboard } from "@/components/ui/AboutDashboard";
import { BarChartComponent } from "./components/ui/BarChartComponent";
import { LineChartComponent } from "./components/ui/LineChartComponent";
import { filter } from "./utils/filter";

const App = () => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(null);
  const [dataFromBe, setDataFromBe] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "",
    endDate: "",
    age: "",
    gender: "",
    cat: "",
  });
  const [date, setDate] = useState({});
  const [category, setCategory] = useState(searchParams.get("cat") || "A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://insight-scope-pp2r.vercel.app/api/data"
        );
        const json = await response.json();
        setDataFromBe(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataFromBe) {
      handleFilter();
    }
  }, [dataFromBe, searchParams]);

  const handleFilter = () => {
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

    let result = filter(dataFromBe, dateRange, ageParams, genderParams);
    setFilteredData(result);
  };

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

  if (!dataFromBe) {
    return <p>Loading data...</p>;
  }

  const resetFilters = () => {
    const initialParams = new URLSearchParams({
      startDate: "",
      endDate: "",
      age: "",
      gender: "",
      cat: "",
    });
    setSearchParams(initialParams, { replace: true });
    setDate({});
    setFilteredData(null);
  };

  const logoutHandle = () => {
    fetch("https://insight-scope-pp2r.vercel.app/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        localStorage.removeItem("authToken");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-teal-600 text-white shadow-md">
        <div>
          <h1 className="text-lg font-semibold">Hello, Yashas!</h1>
          <p>Welcome to the InsightScope dashboard</p>
        </div>

        <button
          onClick={logoutHandle}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-6 mb-10">
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
            className="rounded-md border border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex space-x-4 justify-center mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Age{" "}
              {searchParams.get("age") ? "is " + searchParams.get("age") : ""}
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
              Gender{" "}
              {searchParams.get("gender")
                ? "is " + searchParams.get("gender")
                : ""}
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

          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 my-8">
          {filteredData ? (
            <>
              <BarChartComponent
                className="col-span-1"
                data={filteredData}
                setCategory={setCategory}
                setSearchParams={setSearchParams}
              />
              <LineChartComponent
                className="col-span-1"
                data={filteredData}
                category={category}
              />
            </>
          ) : (
            <p className="text-center text-gray-500">Loading data...</p>
          )}
        </div>

        <AboutDashboard />
      </div>
    </>
  );
};

export default App;
