import React from 'react';
import data from '../data';
import ResultBlock from './ResultBlock';

function App() {
  const [resultsData, setResultsData] = React.useState(null);
  const [metaData, setMetaData] = React.useState(null);
  const getDate = (date) => new Date(date).toISOString();
  const sortBySpeed = (arr) => arr.sort((a, b) => b.opsSec - a.opsSec);

  React.useEffect(() => {
    setResultsData(sortBySpeed(data.results));
    setMetaData(data.metaData);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-xl mb-5">Benchmark</div>
      {metaData && (
        <>
          <h1 className="text-3xl font-bold pb-2">{metaData.title}</h1>
          <div>
            Date Run:{' '}
            <span className="text-indigo-600">
              {getDate(metaData.timeStamp)}
            </span>
          </div>
        </>
      )}
      {resultsData && (
        <>
          <div className="text-xl mt-6 font-bold">
            Results:{' '}
            <button className="button" type="button">
              Download JSON
            </button>
          </div>
          <div className="grid grid-flow-row gap-4 grid-cols-3 mt-3">
            {resultsData.map((item) => (
              <ResultBlock item={item} key={item.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
