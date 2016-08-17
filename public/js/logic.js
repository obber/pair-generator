const makePairs = (students) => {
  if (students.length % 2 !== 0) students.push('');
  let a = students.slice(0, students.length / 2);
  let b = students.slice(students.length / 2);
  let counter = 0;
  let temp;
  let results = [];
  while (++counter < students.length) {
    temp = [];
    a.forEach((student, i) => temp.push([a[i], b[i]]));
    a.push(b.pop());
    b.unshift(a.splice(1, 1)[0]);
    results.push(temp);
  }
  return results;
}
