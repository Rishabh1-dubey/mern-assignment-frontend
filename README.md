# Frontend Assignment – Subscription Manager

This repository contains the solution for the Next.js + Redux state management exercise. The application manages a list of subscriptions, allowing users to add active subscriptions and cancel existing ones while maintaining state consistency with the backend API.

## 🚀 How to Run

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Implementation Details

### 1. State Management (Redux)

I updated the `subscriptionSlice.ts` to include two new Async Thunks:

- `addSubscription`: Dispatches a `POST` request to create a new subscription.
- `cancelSubscription`: Dispatches a `PATCH` request to update an existing subscription's status.

### 2. UI Improvements

- **Separated Lists:** Instead of showing a mixed list of "Active" and "Cancelled" items, I separated them into two distinct columns. This improves readability and allows the user to clearly see the history of cancelled items versus currently active plans.
- **Dynamic Controls:** The "Cancel" button is automatically disabled when there are no active subscriptions (`activeCount === 0`) to prevent unnecessary API calls.

---

## 🧠 Design Decisions & Reasoning

### Why I used `findIndex` instead of `filter` in the Reducer

When a subscription is cancelled, the API returns the updated object with `{ status: 'cancelled' }` rather than deleting the record entirely.

- **My Approach:** I used `findIndex` to locate the specific item in the Redux state array and updated its status.
- **Reasoning:** If I had used `.filter()` to remove the item from the state, the UI would look correct momentarily. However, since the data still exists on the server, a page refresh would bring the item back. Updating the status ensures the **UI stays consistent with the actual server state**.

---

## ⚠️ Identified API Design Issue

As requested in the assignment ("Identify and explain any design or state-related issues"), I noticed a critical limitation in the backend API:

**The Issue: Implicit Cancellation**
The current cancellation endpoint (`PATCH /api/subscriptions`) does not accept an ID. It simply finds the _first_ available active subscription on the server and cancels it.

**Why this is a problem:**
From a User Experience (UX) perspective, this is unpredictable. If a user wants to cancel a specific subscription (e.g., Subscription #3), clicking "Cancel" might remove Subscription #1 instead. The user has no control over _which_ item gets cancelled.

**Recommended Solution:**
The API should be refactored to accept a unique identifier.

- **Current:** `PATCH /api/subscriptions`
- **Proposed:** `PATCH /api/subscriptions/:id` or accepting `{ id: string }` in the request body.

---

## 📝 Project Structure

- `/app/page.tsx`: Main UI component containing the buttons and list rendering logic.
- `/lib/features/subscriptions/subscriptionSlice.ts`: Redux logic for handling API state.
- `/app/api/subscriptions`: Mock backend API (treated as fixed).
