import {use, useEffect, useState } from "react";
import {useStore} from "/src/assets/store.js";

function App() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Filter/>
        <ExtensionList/>
      </Main>
    </Wrapper>
  )
}
export default App;


function Wrapper({children}){
  return (
    <div className="light-gradient dark:dark-gradient font-[Noto_Sans]">
      <div className="max-w-[1440px] _mx-auto px-4.25 pt-5.25 pb-20 min-h-screen ">
        {children}
      </div>
    </div>
  )
}

function ExtensionCard({name, description, logo, isActive, isAdded}){
  const [isChecked, setIsChecked] = useState(isActive);
  const activateExtension = useStore(store => store.activateExtension);
  const toggleAddExtension = useStore(store => store.toggleAddExtension);
  function handleClick(){
    setIsChecked(isChecked => !isChecked)
    activateExtension(name);
  }
  function handleRemove(){
    toggleAddExtension(name)
  }

  return (
    <div className={` bg-white dark:bg-clr-neutral-800 dark:ring dark:ring-clr-neutral-100/50  shadow-lg rounded-3xl grid grid-cols-[auto_1fr] _outline px-4.5 py-4.75 gap-x-4 gap-y-6 desktop:px-4.75 desktop:pt-4.25 grid-rows-[1fr_auto]`}>
      <div className="">
        <img src={logo} alt="extension icon" />
      </div>
      <div>
        <h2 className="font-bold text-[1.3rem]/6 mb-2 text-clr-neutral-900 desktop:text-xl/6 dark:text-white">{name}</h2>
        <p className="text-[15px]/5.5 text-clr-neutral-600 dark:text-clr-neutral-200">{description}</p>
      </div>
      <div className="col-span-2 flex justify-between items-center pt-0.25">
        <button className="border cursor-pointer border-black/30 dark:border-clr-neutral-100/50 pl-[calc(var(--pad-x)+1px)] pr-[calc(var(--pad-x)-1px)] h-9 rounded-2xl tracking-tight [--pad-x:--spacing(4)] dark:text-white hover:bg-clr-red-700 hover:text-white hover:border-clr-red-700/30 focus:ring-1 focus:ring-clr-red-700 focus:bg-transparent focus:text-black" onClick={handleRemove}>{isAdded? "Remove": "Install"}</button>
        <ToggleBtn isChecked={isChecked} handleClick={handleClick}></ToggleBtn>
      </div>
    </div>
  )
}

function ToggleBtn({isChecked, handleClick}){
  return(
    <button className={`relative w-(--btn-w) h-(--btn-h) rounded-[calc(var(--btn-h)/2)] bg-clr-neutral-300 dark:bg-clr-neutral-600 cursor-pointer duration-200 after:content-[""] after:absolute after:rounded-full after:top-(--inner-pad) after:left-(--inner-pad) after:size-(--circle-size) after:bg-white after:duration-200  [--btn-h:--spacing(5)] [--btn-w:--spacing(9.25)] [--inner-pad:--spacing(0.5)] [--circle-size:calc(var(--btn-h)-var(--inner-pad)*2)] ${isChecked && "after:left-[calc(var(--btn-w)-var(--circle-size)-var(--inner-pad))] bg-clr-red-700 dark:bg-clr-red-400"}`} onClick={handleClick} role="switch" aria-label="Toggle button">
    </button>
  )
}

function ExtensionList(){
  const filter = useStore(store => store.filter);
  const extensionsList = useStore(store => store.extensionsList);
  const sortedList = extensionsList.sort(ext =>{
    return ext.isAdded? 0: 1;
  })
  return (
    <div className="grid gap-y-5.5 mt-10.5 desktop:mt-4 grid-cols-[repeat(auto-fit,minmax(341px,1fr))]  max-xs:grid-cols-1 gap-x-3.75 desktop:gap-y-4.25 desktop:auto-rows-[195px]">
      {extensionsList.map(extension =>(
        (filter == 'all' || (filter == 'active' && extension.isActive) || (filter == 'inactive' && !extension.isActive)) &&
        <ExtensionCard {...extension} />  
      ))}
    </div>
  )
}

function FilterBtn({children}){
  const filter = useStore(store => store.filter);
  const changeFilter = useStore(store => store.changeFilter);
  const selected = children.toLowerCase() == filter;
  const handleClick = () => {
    changeFilter(children.toLowerCase())
  }
  return (
    <button className={`cursor-pointer shadow-lg px-4.75 h-11 rounded-3xl text-xl  ${selected? "bg-clr-red-700 dark:bg-clr-red-400 dark:text-black text-white": "bg-white text-clr-neutral-900 dark:bg-clr-neutral-700 dark:text-white ring ring-clr-neutral-300/40 "}`} onClick={handleClick}>
      {children}
    </button>
  )
}

function Filter(){
  return (
    <div className="text-center desktop:flex desktop:justify-between">
      <h1 className="text-[2rem] font-bold mb-4.5 text-clr-neutral-900 dark:text-white desktop:mt-1">Extensions List</h1>
      <div className="flex gap-2.75  justify-center desktop:justify-start desktop:pr-1 desktop:mt-1.25 max-xs:flex-wrap">
        <FilterBtn>All</FilterBtn>
        <FilterBtn>Active</FilterBtn>
        <FilterBtn>Inactive</FilterBtn>
      </div>
    </div>
  )
}

function Main({children}) {
  return (
    <main className="pt-8.5 max-w-[1170px] mx-auto desktop:pt-14.5">
      {children}
    </main>
)
}

function DarkModeBtn() {
  const isDark = useStore(store => store.isDark);
  const setIsDark = useStore(store => store.setIsDark);
  
  const toggleDarkMode = () => {
    setIsDark();
    document.documentElement.classList.toggle('dark')
  }
  
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', isDark);
  })

  return (
    <button className="bg-clr-neutral-100 dark:bg-clr-neutral-700 size-12.25 flex justify-center items-center rounded-xl cursor-pointer" onClick={toggleDarkMode}>
      {isDark ? (
        <img src="/images/icon-sun.svg" alt="sun icon" />
      ) : (
        <img src="/images/icon-moon.svg" alt="moon icon" />
      )}
    </button>
  )
}

function Header(props){
  return (
    <header className="shadow-sm min-h-16 rounded-lg bg-white dark:bg-clr-neutral-800 flex items-center justify-between px-2.75 max-w-[1170px] mx-auto desktop:mt-5 desktop:min-h-18.5 desktop:rounded-3xl desktop:px-4">
      <a href="#" className="cursor-pointer overflow-hidden h-[41px]">
        <img src="/images/logo.svg" alt="logo icon" className="dark:invert-100 h-full object-cover" />
      </a>
      <DarkModeBtn />
    </header>
  )
}