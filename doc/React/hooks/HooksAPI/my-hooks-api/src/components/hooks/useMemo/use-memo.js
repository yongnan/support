import React from 'React';

const memoizedValue = React.useMemo(() => computeExpensiveValue(a, b), [a, b]);

