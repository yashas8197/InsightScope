import { useEffect, useRef, useState } from "react";
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
import { Toaster } from "./components/ui/toaster";
import { FadeLoader } from "react-spinners";
import { useToast } from "./hooks/use-toast";
import { BASE_URL } from "./utils/constant";

const App = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const lineChartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}/get-google-sheet-data`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "If-None-Match": "ff5b95377b937c19476e3d2f2c426d97",
          },
        });

        const result = await response.json();
        if (result.values) {
          const headers = result.values[0];
          const rows = result.values.slice(1);
          const formattedData = rows.map((row) => {
            return row.reduce((acc, val, index) => {
              acc[headers[index]] = val;
              return acc;
            }, {});
          });
          setDataFromBe(formattedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Optional: Fetch data at intervals to keep it up-to-date
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(intervalId); // Cleanup on component unmount
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
    fetch(`${BASE_URL}/api/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        toast({
          title: "Logged out successful!",
        });
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
          <h1 className="text-lg font-semibold">Hello, {user?.fullname}!</h1>
          <p>Welcome to the InsightScope dashboard</p>
        </div>

        <button
          onClick={logoutHandle}
          className="bg-teal-500 hover:bg-white hover:text-black text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </header>
      {filteredData ? (
        <div className="flex container mx-auto py-8 flex-col lg:flex-row">
          {/* Sidebar (Filter Panel) */}
          <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
            <div className="sticky top-0 space-y-6">
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

              <div className="space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition">
                    Age{" "}
                    {searchParams.get("age")
                      ? "is " + searchParams.get("age")
                      : ""}
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
                  <DropdownMenuTrigger className="w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition">
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
                  className="w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 px-4 space-y-6">
            <div className="grid gap-6 lg:grid-cols-1">
              <>
                <BarChartComponent
                  className="col-span-1"
                  data={filteredData}
                  setCategory={setCategory}
                  setSearchParams={setSearchParams}
                  lineChartRef={lineChartRef}
                />
                <div ref={lineChartRef}>
                  <LineChartComponent
                    className="col-span-1"
                    data={filteredData}
                    category={category}
                  />
                </div>
              </>
            </div>

            <AboutDashboard />
          </div>
        </div>
      ) : (
        <div className="flex bg-[#0D9488] text-white justify-center items-center h-screen">
          <FadeLoader size="100" />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default App;
