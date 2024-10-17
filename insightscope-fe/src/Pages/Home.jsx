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

const dataFromBe = [
  {
    Day: "4/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 980,
    B: 424,
    C: 804,
    D: 272,
    E: 855,
    F: 714,
  },
  {
    Day: "4/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 297,
    B: 238,
    C: 531,
    D: 520,
    E: 995,
    F: 808,
  },
  {
    Day: "4/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 575,
    B: 551,
    C: 944,
    D: 226,
    E: 362,
    F: 137,
  },
  {
    Day: "4/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 684,
    B: 734,
    C: 898,
    D: 585,
    E: 416,
    F: 803,
  },
  {
    Day: "5/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 394,
    B: 185,
    C: 746,
    D: 921,
    E: 341,
    F: 959,
  },
  {
    Day: "5/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 881,
    B: 554,
    C: 835,
    D: 633,
    E: 881,
    F: 654,
  },
  {
    Day: "5/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 209,
    B: 840,
    C: 698,
    D: 868,
    E: 712,
    F: 974,
  },
  {
    Day: "5/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 609,
    B: 577,
    C: 457,
    D: 944,
    E: 417,
    F: 208,
  },
  {
    Day: "6/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 872,
    B: 904,
    C: 248,
    D: 795,
    E: 72,
    F: 327,
  },
  {
    Day: "6/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 221,
    B: 161,
    C: 76,
    D: 741,
    E: 127,
    F: 751,
  },
  {
    Day: "6/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 262,
    B: 938,
    C: 238,
    D: 539,
    E: 34,
    F: 74,
  },
  {
    Day: "6/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 909,
    B: 588,
    C: 142,
    D: 289,
    E: 262,
    F: 810,
  },
  {
    Day: "7/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 189,
    B: 9,
    C: 718,
    D: 837,
    E: 350,
    F: 256,
  },
  {
    Day: "7/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 771,
    B: 183,
    C: 820,
    D: 217,
    E: 464,
    F: 403,
  },
  {
    Day: "7/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 130,
    B: 851,
    C: 724,
    D: 701,
    E: 251,
    F: 579,
  },
  {
    Day: "7/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 711,
    B: 612,
    C: 174,
    D: 256,
    E: 190,
    F: 993,
  },
  {
    Day: "8/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 269,
    B: 804,
    C: 93,
    D: 355,
    E: 968,
    F: 106,
  },
  {
    Day: "8/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 973,
    B: 817,
    C: 192,
    D: 338,
    E: 683,
    F: 436,
  },
  {
    Day: "8/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 856,
    B: 866,
    C: 86,
    D: 557,
    E: 251,
    F: 967,
  },
  {
    Day: "8/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 564,
    B: 862,
    C: 433,
    D: 651,
    E: 2,
    F: 362,
  },
  {
    Day: "9/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 562,
    B: 106,
    C: 15,
    D: 45,
    E: 29,
    F: 825,
  },
  {
    Day: "9/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 6,
    B: 57,
    C: 724,
    D: 59,
    E: 332,
    F: 458,
  },
  {
    Day: "9/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 887,
    B: 87,
    C: 662,
    D: 833,
    E: 83,
    F: 673,
  },
  {
    Day: "9/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 795,
    B: 363,
    C: 555,
    D: 57,
    E: 802,
    F: 562,
  },
  {
    Day: "10/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 731,
    B: 309,
    C: 402,
    D: 643,
    E: 62,
    F: 251,
  },
  {
    Day: "10/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 86,
    B: 89,
    C: 848,
    D: 532,
    E: 581,
    F: 310,
  },
  {
    Day: "10/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 318,
    B: 225,
    C: 852,
    D: 610,
    E: 747,
    F: 591,
  },
  {
    Day: "10/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 134,
    B: 199,
    C: 761,
    D: 754,
    E: 547,
    F: 552,
  },
  {
    Day: "11/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 648,
    B: 871,
    C: 717,
    D: 804,
    E: 463,
    F: 689,
  },
  {
    Day: "11/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 641,
    B: 308,
    C: 725,
    D: 875,
    E: 729,
    F: 291,
  },
  {
    Day: "11/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 419,
    B: 165,
    C: 195,
    D: 582,
    E: 32,
    F: 131,
  },
  {
    Day: "11/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 975,
    B: 377,
    C: 847,
    D: 128,
    E: 486,
    F: 415,
  },
  {
    Day: "12/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 900,
    B: 391,
    C: 40,
    D: 463,
    E: 792,
    F: 623,
  },
  {
    Day: "12/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 175,
    B: 636,
    C: 86,
    D: 25,
    E: 475,
    F: 639,
  },
  {
    Day: "12/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 841,
    B: 270,
    C: 465,
    D: 128,
    E: 742,
    F: 222,
  },
  {
    Day: "12/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 977,
    B: 889,
    C: 858,
    D: 157,
    E: 182,
    F: 734,
  },
  {
    Day: "13/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 305,
    B: 421,
    C: 936,
    D: 620,
    E: 931,
    F: 821,
  },
  {
    Day: "13/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 231,
    B: 772,
    C: 284,
    D: 209,
    E: 740,
    F: 174,
  },
  {
    Day: "13/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 468,
    B: 333,
    C: 368,
    D: 89,
    E: 637,
    F: 537,
  },
  {
    Day: "13/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 105,
    B: 704,
    C: 3,
    D: 163,
    E: 777,
    F: 934,
  },
  {
    Day: "14/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 636,
    B: 718,
    C: 953,
    D: 633,
    E: 122,
    F: 578,
  },
  {
    Day: "14/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 681,
    B: 571,
    C: 49,
    D: 792,
    E: 493,
    F: 558,
  },
  {
    Day: "14/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 420,
    B: 169,
    C: 638,
    D: 959,
    E: 839,
    F: 196,
  },
  {
    Day: "14/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 44,
    B: 139,
    C: 984,
    D: 775,
    E: 78,
    F: 372,
  },
  {
    Day: "15/10/2022",
    Age: "15-25",
    Gender: "Male",
    A: 641,
    B: 92,
    C: 647,
    D: 94,
    E: 725,
    F: 173,
  },
  {
    Day: "15/10/2022",
    Age: ">25",
    Gender: "Male",
    A: 648,
    B: 138,
    C: 762,
    D: 218,
    E: 102,
    F: 224,
  },
  {
    Day: "15/10/2022",
    Age: "15-25",
    Gender: "Female",
    A: 85,
    B: 892,
    C: 944,
    D: 382,
    E: 108,
    F: 803,
  },
  {
    Day: "15/10/2022",
    Age: ">25",
    Gender: "Female",
    A: 753,
    B: 856,
    C: 365,
    D: 73,
    E: 117,
    F: 478,
  },
];

const Home = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "",
    endDate: "",
    age: "",
    gender: "",
  });

  const [date, setDate] = useState({});

  const [category, setCategory] = useState("A");

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
  }, [JSON.stringify(dateRange), ageParams, genderParams]);

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
