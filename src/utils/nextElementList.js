const nextElementList = (list, value) => {
  const currentValueIndex = list.indexOf(value); // 0
  const nextValueIndex = (currentValueIndex + 1) % list.length;
  const nextValue = list[nextValueIndex];
  return nextValue;
};

export default nextElementList;
