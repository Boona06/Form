export default function Form(next){
    return(
       
            <div className="w-[32rem] h-[41rem] bg-white rounded-[8px] ml-auto mr-auto ">
        <img src="Main.png" className="pt-6 pl-4 w-[60px] h-[66px] ml-6" /> 
        <h1 className="font-bold text-[2rem] pl-10">Join Us! 😎</h1>
        <p className="pl-10 text-[#8E8E8E]">Please provide all current information accurately.</p>
         <p className="pl-10 pt-10 mt-2 font-bold ">First name *</p>
              <input placeholder="First name" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2  "></input>
              <p className="pl-10 mt-2 font-bold ">Last name *</p>
              <input placeholder="Last name" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2"></input>
              <p className="pl-10 mt-2 font-bold ">Username *</p>
              <input placeholder="Username" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2"></input>
              <button onClick={next} className="w-[26rem] h-[3rem] bg-[#d6d8db] rounded-[6px] text-[#A9ACAF] text-[1rem] mt-[4rem] ml-10"> Continue 1/3</button>
        </div>
        
        
    );
}