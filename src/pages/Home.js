import "../App.css";

import React, { useCallback, useEffect, useState } from "react";
import Filter from "../components/Filter";
import Rating from "../components/Rating";
import clsx from "clsx";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const baseFilter = {
  open: false,
  category: null,
  price: null,
};

export default function Home({ children }) {
  const [limit, setLimit] = useState(8);
  const [listResto, setListResto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(baseFilter);
  const cleanData = listResto.filter((item) => item.name);
  const onFilter = useCallback(
    (val) => {
      let itemMaxPrice = parseInt(
        val?.price?.split("-")[1]?.replace(/,/g, "")?.split("$")[1],
        10
      );

      let condition = true;

      if (filter.price) {
        condition = condition && itemMaxPrice < parseInt(filter.price);
        if (!filter.category) return condition;
      }

      if (filter.category) {
        condition =
          condition &&
          val?.cuisine?.map((val) => val.name).includes(filter.category);
        return condition;
      }

      return true;
    },
    [filter]
  );

  const filteredData = cleanData
    .slice(0, limit)
    .filter(onFilter)
    .sort((a, b) => {
      if (filter.open) {
        if (!a.is_closed && b.is_closed === undefined) return -1;
        if (a.is_closed === undefined && !b.is_closed) return 1;
      } else {
        if (!a.is_closed && b.is_closed === undefined) return 1;
        if (a.is_closed === undefined && !b.is_closed) return -1;
      }

      return 0;
    });
  useEffect(() => {
    const getResto = async () => {
      try {
        const qs = {
          location_id: "297705",
          limit: "30",
        };
        setLoading(true);
        const { data } = await axios(
          `${process.env.REACT_APP_API_URL}/restaurants/list/`,
          {
            method: "GET",
            params: qs,
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
              "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
            },
          }
        );

        setListResto(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // console.log(error);
        toast.error("Something went wrong");
      }
    };
    getResto();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    setLimit((prevState) =>
      prevState + 8 < cleanData.length
        ? prevState + 8
        : prevState + cleanData.length - prevState
    );
    setLoading(false);
  };

  const handleClear = () => {
    setLimit(8);
    setFilter(baseFilter);
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Restaurants List's App - Find Best Restaurants in here!</title>
        <meta
          name="description"
          data-rh={true}
          content="Find Best Restaurants in here!"
        />
      </Helmet>
      <div className="w-full">
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex flex-col gap-4">
            <div className="mb-8">
              <h1 className="font-semibold text-3xl">Restaurants</h1>
              <p>Find Best Restaurants in here!</p>
            </div>
            <Filter
              listCategories={cleanData}
              filter={filter}
              setFilter={setFilter}
              handleClear={handleClear}
            />
            <div className="flex flex-col items-start">
              <div className="flex flex-col mb-4">
                <h2 className="font-semibold text-2xl">All Restaurants</h2>
              </div>
              <div className="w-full h-full">
                {loading ? (
                  <Loading width="24" height="24" />
                ) : (
                  <div className="flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                      {filteredData?.map((item, i) => {
                        if (!item?.name) return null;
                        return (
                          <div
                            key={item?.raw_ranking}
                            className="w-full h-full rounded-lg overflow-hidden border shadow-lg"
                          >
                            <div className="flex flex-col h-full">
                              <div className="relative aspect-square w-full h-1/2">
                                <img
                                  className="object-cover w-full h-full absolute"
                                  src={item?.photo?.images?.large?.url}
                                  alt={item?.photo?.caption}
                                />
                              </div>
                              <div className="p-2 flex flex-col h-1/2 justify-between">
                                <div className="flex flex-col">
                                  <h3 className="font-semibold">
                                    {item?.name}
                                  </h3>
                                  <Rating value={parseFloat(item?.rating)} />
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 flex-wrap">
                                    <span className="text-xs uppercase">
                                      {item?.cuisine
                                        ? item?.cuisine[0]?.name
                                        : null}
                                    </span>
                                    <span>🞄</span>
                                    <span className="text-xs">
                                      {item?.price_level}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span
                                      className={clsx("w-2 h-2 rounded-full", {
                                        "bg-red-500": item?.is_closed,
                                        "bg-green-500": !item?.is_closed,
                                      })}
                                    ></span>
                                    <span className="text-xs whitespace-nowrap">
                                      {!item?.is_closed ? "OPEN NOW" : "CLOSED"}
                                    </span>
                                  </div>
                                </div>
                                <Link
                                  to={`/resto/${item?.location_id}`}
                                  className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent disabled:bg-slate-200 disabled:hover:cursor-not-allowed disabled:text-slate-300 font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm cursor-pointer"
                                >
                                  LEARN MORE
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {cleanData.length - limit > 0 ? (
                      <button
                        onClick={handleLoadMore}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent disabled:bg-slate-200 disabled:hover:cursor-not-allowed disabled:text-slate-300 font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm cursor-pointer mt-8"
                      >
                        Load More
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
