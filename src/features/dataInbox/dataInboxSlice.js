import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'dataInbox/fetchData',
  async thunkAPI => {
    // API was giving me CORS issues, so leaving this here if you want to uncomment to try it
    // const response = await fetch('https://private-39e16-alkymiexercise.apiary-mock.com/list')
    //   .then(response => response.json())
    return {
      "count": 3,
      "fields": {
        "fund_name": {
          "name": "Fund Name",
          "type": "text"
        },
        "due_date": {
          "name": "Due Date",
          "type": "date"
        },
        "price": {
          "name": "Price",
          "type": "text"
        }
      },
      "results": [
        {
          "uuid": "5c7957e0-c08c-47c9-863a-0ddec7e873a8",
          "created": "2020-07-01T15:40:07.681742Z",
          "name": "Test Document A",
          "data": {
            "fund_name": {
              "text": "Cookie Capital",
              "validation_error": null
            },
            "due_date": {
              "text": "2020-07-01",
              "validation_error": null
            },
            "price": {
              "text": "$5.00",
              "validation_error": null
            }
          }
        },
        {
          "uuid": "5c7957e0-c08c-47c9-863a-0ddec7e873a9",
          "created": "2020-07-02T15:40:07.681742Z",
          "name": "Test Document B",
          "data": {
            "fund_name": {
              "text": "Bonbon Capital",
              "validation_error": null
            },
            "due_date": {
              "text": "2020-05-20",
              "validation_error": null
            },
            "price": {
              "text": "€10,00",
              "validation_error": null
            }
          }
        },
        {
          "uuid": "5c7957e0-c08c-47c9-863a-0ddec7e873a0",
          "created": "2020-07-03T15:40:07.681742Z",
          "name": "Test Document C",
          "data": {
            "fund_name": {
              "text": "Fajita Ventures",
              "validation_error": null
            },
            "due_date": {
              "text": "1/5/2020",
              "validation_error": "1/5/2020 is not in the correct format of YYYY-MM-DD"
            },
            "price": {
              "text": " ¥1000",
              "validation_error": null
            }
          }
        }
      ]
    }
  }
)

export const dataInboxSlice = createSlice({
  name: 'dataInbox',
  initialState: { records: [] },
  reducers: {
    // have to store check status in the reducer, for when they try to remove multiple items
    toggleCheck: (state, action) => {
      state.records.forEach((item) => {
        if (item.record.uuid === action.payload) {
          item.isChecked = !item.isChecked;
        }
      });
    },

    removeItems: state => {
      state.records = state.records.filter(item => !item.isChecked);
    },

    selectAll: state => {
      state.records.forEach(item => item.isChecked = true);
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      // Add record with isChecked property to the state
      action.payload.results.forEach((result, index) => {
        state.records.push({ record: result, isChecked: false });
      })
    }
  },
});

export const { selectAll, unSelectAll, removeItems, toggleCheck } = dataInboxSlice.actions;

export default dataInboxSlice.reducer;
