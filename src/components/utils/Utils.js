// class VacantionClass {
//   constructor() {
//   }
//   getAllVacantions() {
//     // получение всех вакансий при монтировании
//     axios.get(`http://opendata.trudvsem.ru/api/v1/vacancies?offset=${currentPage}&limit=20`)
//       .then(res => {
//         dispatch(setVacancies(res.data));
//         if (res.data.results.vacancies.length > 0) {
//           setCurrentPage(prevState => prevState + 1);
//         }
//         setFetching(true);
//       })
//       .catch(err => { throw new Error(err); })
//       .finally(() => {
//         setFetching(false);
//         setNeedLoader(false);
//       });
//   }
// }

// export default VacantionClass