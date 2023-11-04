import React from "react";

export default function Filter({
  filter,
  setFilter,
  listCategories,
  handleClear,
}) {
  const priceValues = [
    {
      id: 1,
      value: "1000",
    },
    {
      id: 2,
      value: "3000",
    },
    {
      id: 3,
      value: "5000",
    },
    {
      id: 4,
      value: "7000",
    },
    {
      id: 5,
      value: "9000",
    },
  ];
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-4">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <span>Filter by: </span>
        <div className="flex flex-wrap items-center justify-center gap-6 h-full">
          <div className="flex items-center space-x-4 border-b-2 py-2">
            <input
              type="checkbox"
              id="hs-small-switch"
              checked={filter.open}
              onChange={(e) => setFilter({ ...filter, open: e.target.checked })}
              className="relative shrink-0 w-11 h-6  checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200  ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none   before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 bg-slate-500"
            />
            <label htmlFor="hs-small-switch" className="text-sm">
              Open Now
            </label>
          </div>

          <div className="flex border-b-2 pb-[3.5px]">
            <select
              value={filter?.price || "price"}
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
              className="p-2  block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option disabled value={"price"}>
                Prices
              </option>
              {priceValues?.map((item) => {
                return (
                  <option key={item.id} value={item.value}>
                    Under {formatter.format(item.value)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex border-b-2 pb-[3.5px]">
            <select
              value={filter?.category || "category"}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
              className="p-2  block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option disabled value={"category"}>
                Category
              </option>
              {[
                ...new Set(
                  listCategories
                    ?.map((dt) => [
                      ...new Set(dt.cuisine?.map((cui) => cui.name)),
                    ])
                    .reduce((accumulator, currentArray) => {
                      return accumulator.concat(currentArray);
                    }, [])
                ),
              ]?.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={handleClear}
        type="button"
        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent disabled:bg-slate-200 disabled:hover:cursor-not-allowed disabled:text-slate-300 font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
      >
        CLEAR ALL
      </button>
    </div>
  );
}
