import React from 'react';
import data from './data/';

function App() {

  const [fileData, setFileData] = React.useState(null);

  React.useEffect(() => {
    setFileData(data);
  }, [])

  return (
    <div>
      <h1 className="text-3xl mb-5">Benchmark:{' '}
        <span className="text-indigo-600">{ fileData.metaData.title }</span>
      </h1>
      <div className="text-xl font-bold">Results</div>
      { fileData.results.map(item => (
        <div>{ item.name }</div>
      )) }
    </div>
  );
}

export default App;
