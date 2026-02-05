import { useContext } from "react";
import { myContext } from "../store/Context";

const TopSection = (props) => {
    const ctx = useContext(myContext);
    const cities = [
        {name : 'حلب' ,value : 'Aleppo'},
        {name : 'دمشق' ,value : 'Damascus'},
        {name : 'الرياض' ,value : 'Riyadh'},
        {name : 'القاهرة' ,value : 'Cairo'},
        {name : 'عمان' ,value : 'Amman'},
        {name : 'بيروت' ,value : 'Beirut'},
        {name : 'بغداد' ,value : 'Baghdad'},
        {name : 'الكويت' ,value : 'Kuwait'},
        {name : 'تونس' ,value : 'Tunis'},
        {name : 'الجزائر' ,value : 'Algeris'},
    ]; 
    function changeCityHandler (event) {
        ctx.settingCity(event.target.value);
    }
    return <div className="flex justify-between pb-6 border-b-2 border-solid border-neutral-400">
        <div>
            <p className="font-bold mb-2">المحافظة</p>
            <select className="w-32 sm:w-48 lg:w-60 px-4 py-1 rounded bg-orange-800 focus:outline-none"
                disabled={!props.isOnline}
                value={ctx.city} 
                onChange={changeCityHandler}>
                {cities.map((city) => (
                    <option key={city.value} value={city.value}>{city.name}</option>
                ))}
            </select>
        </div>
        <div className="lg:ml-10">
            <p className="font-bold mb-2">تاريخ اليوم</p>
            <p className="font-bold mb-2">{props.date}</p>
        </div>
    </div>
}
export default TopSection;