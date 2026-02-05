import { useContext, useEffect, useMemo, useState } from "react"
import ButtomSection from "./components/ButtomSection"
import TopSection from "./components/TopSection"
import { myContext } from "./store/Context";

function App() {
  const currentDate = new Date();
  const year = String(currentDate.getFullYear());
  const month = String((currentDate.getMonth()+1) <10 ? '0' + (currentDate.getMonth() +1) : (currentDate.getMonth() + 1));
  const day = (currentDate.getDate()) <10 ? '0' + currentDate.getDate() : currentDate.getDate();
  const today = `${day}-${month}-${year}`;
   const ctx = useContext(myContext);
  const [date , setDate] = useState('');
  const [timings , setTimings] = useState({});
  const [error , setError] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  async function fetchingData () {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${today}?city=Eg&country=${ctx.city}`);
      if(!response.ok) {
        throw new Error ('fetch failed!');
      }
      const data = await response.json();
      setDate(data.data.date.gregorian.date);
      setTimings(data.data.timings);
      localStorage.setItem('timings' , JSON.stringify(data.data.timings));
      localStorage.setItem('date' , data.data.date.gregorian.date);
    }
    catch (error) {
      localStorage.getItem('timings') && setTimings(JSON.parse(localStorage.getItem('timings')));
      localStorage.getItem('date') && setDate(localStorage.getItem('date'));
      setError(error.message);
    }
    setIsLoading(false);
  }
  
  const isOnline = useMemo(() => {
    return navigator.onLine;
  }, [navigator.onLine]);

  useEffect(() => {
    fetchingData();
  },[ctx.city]);
  let content = '';
 
    if(isLoading) 
      content = <p className="text-center">Loading...</p>;
      if(!isLoading && !error) 
        content = <>
        {/* <p className="text-center">By Eng.Mohammad Wahid Albadawi</p> */}
          <TopSection date={date} isOnline={isOnline}/>
          <ButtomSection timings={timings}/>
        </>
  return (
    <section>
      <div className="my-container flex items-center text-white">
        <div className="main-dev mx-auto lg:mx-40 p-6 rounded w-[90%] md:w-3/4 lg:w-1/2 border-2 border-solid border-slate-400">
        {!isOnline && <p className="text-center text-red-500 mb-4">You are offline</p>}
        {content}
        </div>
      </div>
    </section>
  )
}

export default App
