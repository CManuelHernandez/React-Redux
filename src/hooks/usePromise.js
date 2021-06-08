import React from 'react';

function usePromise(initialValue) {
  const [data, setData] = React.useState(initialValue);
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState(null);

  const resetError = () => setError(null);

  const startExecution = () => {
    resetError();
    setIsPending(true);
  };

  const finishExecution = (error, data) => {
    setIsPending(false);
    if (error) {
      return setError(error);
    }
    setData(data);
  };

  const execute = async function (promise) {
    startExecution();
    try {
      const result = await promise;
      finishExecution(null, result);
      return result;
    } catch (error) {
      finishExecution(error);
      throw error;
    }
  };

  return {
    isPending,
    error,
    data,
    execute,
    resetError,
  };
}

export default usePromise;
