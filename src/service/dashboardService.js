 export const getRecords = () => {
    return JSON.parse(localStorage.getItem('records')) || [];
  };
  
  export const saveRecords = (records) => {
    localStorage.setItem('records', JSON.stringify(records));
  };
  
  export const addRecord = (records, newRecord) => {
    return [...records, newRecord];
  };
  
  export const updateRecord = (records, updatedRecord, editIndex) => {
    const updatedRecords = [...records];
    updatedRecords[editIndex] = updatedRecord;
    return updatedRecords;
  };
  
  export const deleteRecord = (records, index) => {
    return records.filter((_, i) => i !== index);
  };
  