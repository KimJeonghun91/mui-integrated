# MUI X Date Pickers

This package is the community edition of the date and time picker components.
It's part of [MUI X](https://mui.com/x/), an open-core extension of MUI Core, with advanced components.

## Installation

Install the package in your project directory with:

```bash
npm install my-mui/x-date-pickers
```

Then install the date library of your choice (if not already installed).
The pickers currently support the following date libraries:

- [date-fns](https://date-fns.org/)
- [Day.js](https://day.js.org/)
- [Luxon](https://moment.github.io/luxon/#/)
- [Moment.js](https://momentjs.com/)

```bash
// date-fns
npm install date-fns
// or dayjs
npm install dayjs
// or luxon
npm install luxon
// or moment
npm install moment
```

This component has the following peer dependencies that you will need to install as well.

```json
"peerDependencies": {
  "my-mui/material": "^5.8.6",
  "my-mui/system": "^5.8.0",
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0"
},
```

After completing the installation, you have to set the `dateAdapter` prop of the `LocalizationProvider` accordingly.
The supported adapters are exported from `my-mui/x-date-pickers`.

```jsx
import { LocalizationProvider } from 'my-mui/x-date-pickers/LocalizationProvider';
// date-fns
import { AdapterDateFns } from 'my-mui/x-date-pickers/AdapterDateFns';
// or for dayjs
import { AdapterDayjs } from 'my-mui/x-date-pickers/AdapterDayjs';
// or for luxon
import { AdapterLuxon } from 'my-mui/x-date-pickers/AdapterLuxon';
// or for moment
import { AdapterMoment } from 'my-mui/x-date-pickers/AdapterMoment';

function App({ children }) {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
}
```

## Documentation

Visit [https://mui.com/x/react-date-pickers/](https://mui.com/x/react-date-pickers/) to view the full documentation.
