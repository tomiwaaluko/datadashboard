# Web Development Project 5 - Data Dashboard

Submitted by: **Olatomiwa Aluko**

This web app: **A dynamic data dashboard that fetches data from an API and provides advanced filtering, sorting, and visualization capabilities.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Total number of items
    - Average value of a key attribute
    - Count of items in a specific category
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

- [x] Chart visualization using a library like Chart.js or Recharts
- [x] Export functionality to download filtered data as a CSV file
- [x] Responsive design for mobile and desktop views

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://imgur.com/a/HBjMa5M' title='Data Dashboard' width='' alt='Data Dashboard' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with [ScreenToGif](https://www.screentogif.com/) for Windows

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Challenges encountered while building the app:

- Debugging API call errors and ensuring data was fetched correctly.
- Implementing dynamic filtering logic with multiple filters.
- Ensuring responsive design worked seamlessly across devices.

## License

    Copyright 2025 Olatomiwa Aluko

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
