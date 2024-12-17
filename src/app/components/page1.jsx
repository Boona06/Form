export default function Page1(){
    return(
        <div className="w-[32rem] h-[43rem] bg-white rounded-[8px] ml-auto mr-auto ">
        <img src="Main.png" className="pt-6 pl-4 w-[60px] h-[66px] ml-6" /> 
        <h1 className="font-bold text-[2rem] pl-10">Join Us! 😎</h1>
        <p className="pl-10 text-[#8E8E8E]">Please provide all current information accurately.</p>
         <p className="pl-10 pt-10 mt-2 font-bold ">Email *</p>
              <input placeholder="Email" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2  "></input>
              <p className="pl-10 mt-2 font-bold ">Phone number *</p>
              <input placeholder="Phone number" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2"></input>
              <p className="pl-10 mt-2 font-bold ">Password *</p>
              <input type="password" placeholder="Username" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2"></input>
              <p className="pl-10 mt-2 font-bold ">Confirm password *</p>
              <input type="password" placeholder="Confirm password" className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2"></input>
              <div className="flex ">
            <button className="w-[8rem] h-[3rem] border-2 border-solid rounded-[6px] font-bold text-[1rem] mt-[4rem] ml-10"> Back</button>
              <button className="w-[24rem] h-[3rem] bg-[#d6d8db] rounded-[6px] text-[#A9ACAF] text-[1rem] mt-[4rem] ml-2 mr-14"> Continue 2/3</button>
              </div>
              
        </div>
        
    );
}