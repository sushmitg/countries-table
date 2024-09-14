# React + Vite - Countries List Table

- This is an app which fetches countries from https://api.sampleapis.com/countries/countries API and renders them in a Table.

- The app contains a Search box to filter the countries list by Country Name and a Population Filter to filter the list by population < 1M, < 5M or < 10M.
The Filters remain inactive until the user clicks on "Show All Countries" button.

- When user click "Show All Countries" button the list is fetched (only once) and rendered in the table below and the Button's text changes to "Hide Countries".

- Whenever "Show All Countries"/"Hide Countries" button is clicked, the filters get reset.

- The table rendered is paginated. Default page size is 10 which can be changed from the provided dropdown below the table. The pagination section has 4 buttons to go to 1st, Previous, Next and Last Page. The total count of the countries is display in the bottom left of the table.

- The App uses TanStack Table v8 library to render the Table Component.