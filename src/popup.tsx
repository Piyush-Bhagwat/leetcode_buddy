import { useEffect, useState } from "react"
import "./index.css"
import { getHint } from "~utils/gemini";

import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";

import { getDescription, getTitle } from "~utils/chromeFunctions";
import { Button } from "~component/Button";

function IndexPopup() {
    const [title, setTitle] = useState("");
    const [hints, setHints] = useState([]);
    const [hintIDX, setHintIDX] = useState(-1);

    const [hintsLoading, setHintsLoading] = useState(false);

    async function fetch() {
        const t = await getTitle();
        setTitle(t);
    }

    useEffect(() => {
        fetch();
    }, [])


    async function handleGenerateHints() {
        setHintsLoading(true);
        if (hints.length == 0) {
            const description = await getDescription()
            // const h = await getHint(title, description);
            setHints(["just fukin solve it bro! what are u potato?", "What are you doing i said solve the fuck out of that question quick.", "Are u serious you cant even solve that simple question and u need help for that shit there"]);
            // setHints(h);
        }
        setHintIDX(0);
        setHintsLoading(false);
    }

    function handlePrevHint() {
        setHintIDX(p => (p - 1) < 0 ? 2 : p - 1);
    }

    function handleNextHint() {
        setHintIDX(p => (p + 1) % 3);
    }



    return (
        <main className="p-4 w-[300px] flex flex-col gap-4">
            <div>
                <h1 className="text-lg font-bold">Welcome to LeetBuddy</h1>
                <h3 className="font-bold text-neutral-600">Problem: {title}</h3>
            </div>

            <div className="text-sm text-neutral-900 whitespace-pre-wrap min-h-[70px] rounded-md p-1 bg-gray-100 outline-2 outline-dashed outline-neutral-400">
                {hints.length == 0 ? "Tried to Solve it yourself first?" : hints[hintIDX]}
            </div>

            <div className=" flex flex-col gap-2">
                {hints.length == 0 ? <Button className="" onClick={handleGenerateHints}>Generate Hints <RiGeminiFill className={`${hintsLoading && "animate-spin"}`} /></Button>

                    :
                    <div className="flex gap-2 items-center">
                        <Button className="py-2" onClick={handlePrevHint}><FaArrowLeft /></Button>
                        <p className="outline outline-2 outline-neutral-400 w-14 flex justify-center items-center aspect-square rounded-full">{hintIDX + 1}</p>
                        <Button className="py-2" onClick={handleNextHint}><FaArrowRight /></Button>
                    </div>
                }

                <Button className="" onClick=""> Get complete Code <RiGeminiFill /> </Button>
            </div>

        </main>
    )
}

export default IndexPopup
