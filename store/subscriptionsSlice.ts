import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetch",
  async () => {
    const res = await fetch("/api/subscriptions");
    return res.json();
  }
);

// Added two new Async Thunks to interact with the API:
// addSubscription: Handles POST /api/subscriptions to create new active subscriptions.
export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async () => {
    // Ye tumhare POST API ko hit karega
    const res = await fetch("/api/subscriptions", { method: "POST" });
    return await res.json(); // Ye naya object return karega
  }
);
//  cancelSubscription: Handles POST /api/subscriptions to cancel  active subscriptions.
export const cancelSubscription = createAsyncThunk(
  "subscriptions/cancel",
  async () => {
    // this will hit your api
    const res = await fetch("/api/subscriptions", { method: "PATCH" });
    return await res.json(); // Ye updated object return karega
  }
);

type Subscription = {
  id: string;
  status: "active" | "cancelled";
};

type SubscriptionsState = {
  data: Subscription[];
  loading: boolean;
  activeCount: number;
};

const initialState: SubscriptionsState = {
  data: [],
  loading: false,
  activeCount: 0,
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.activeCount = action.payload.filter(
          (s: Subscription) => s.status === "active"
        ).length;
        state.loading = false;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        //  adding new item int the list
        state.data.push(action.payload);
        // increase the Count
        state.activeCount += 1;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        const updatSubscription = action.payload;

        if (updatSubscription) {
          // List mein wo item dhundo
          const index = state.data.findIndex(
            (s) => s.id === updatSubscription.id
          );
          // findIndex  to locate and update specific items instead of filtering them out
          if (index !== -1) {
            state.data[index] = updatSubscription;
            state.activeCount -= 1;
          }
        }
      });
  },
});

export default subscriptionsSlice.reducer;
