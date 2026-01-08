"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import {
  addSubscription,
  cancelSubscription,
  fetchSubscriptions,
} from "../store/subscriptionsSlice";

export const SubscriptionsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, activeCount, loading } = useSelector(
    (state: any) => state.subscriptions
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const handleAddClick = () => {
    dispatch(addSubscription());
  };

  //delete the data based on id
  const handleRemove = (id: string) => {
    console.log("User wants to cancel", id);
    dispatch(cancelSubscription());
  };
  //for checking which id is active and which one is cancel
  const activeLogs = data.filter((item: any) => item.status === "active");
  const cancelLogs = data.filter((item: any) => item.status === "cancelled");

  return (
    <>
      <h3 className="font-bold mb-3 ">Active subscriptions: {activeCount}</h3>
      <ul className="mb-6">
        {/* here for better ui, which data is active or cancel so i render it conditionally */}
        {data.map((s: any) => (
          <li key={s.id}>
            {s.status === "active"
              ? `The ${s.status} Id : ${s.id}`
              : `the ${s.status} Id is: ${s.id}`}
          </li>
        ))}
      </ul>
      <hr className="mb-2"></hr>
      <button className="border border-black mb-6" onClick={handleAddClick}>
        {loading ? "Loaing..." : "Add +"}
      </button>
      <div>
        {activeLogs.length === 0 ? (
          <p>No active subscriptios</p>
        ) : (
          activeLogs.map((item: any) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
              <span>Active {item.id}</span>

              <button
                className="ml-2 text-sm border px-2 rounded"
                onClick={() => handleRemove(item.id)}
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
      <hr></hr>
      {/* created a seperate history for cancel to check which id is getting cancel */}
      <div>
        {cancelLogs.length === 0 ? (
          <p>No History</p>
        ) : (
          cancelLogs.map((item: number | any) => (
            <div key={item.id}>The Cancel id is {item?.id}</div>
          ))
        )}
      </div>
    </>
  );
};
