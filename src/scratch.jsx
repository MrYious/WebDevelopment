
    const lettersNumbersDashes = (str) => {
        return /^[A-Za-z0-9_]*$/.test(str);
    }

    const [nickname, setNickname] = useState('');
    const [isValidRoom, setIsValidRoom] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isStarted, setIsStarted] = useState(false);


    const [validateNickname, setValidateNickname] = useState(false);

    const handleClickJoin = () => {
        console.log('Join: clicked');
        console.log('Nickname: ', nickname)
        if(nickname.length !== 0 & nickname !== ' '){
            if(lettersNumbersDashes(nickname)){
                setIsRegistered(true);
            }else{
                setMessage("Sorry 🥺 but we only allow letters, numbers, and underscore")
                setValidateNickname(false);
            }
        }else{
            console.log("Empty");
        }
    };

    const handleGoBack = () => {
        setIsRegistered(false);
        setIsValidRoom(true);
    }

    const handleClickEnter = () => {
        console.log('Enter: clicked');
        console.log('Room code: ', roomCode)
        if(roomCode.length !== 0 & roomCode !== ' '){
            setMessage("What shall we call you?")
            setIsValidRoom(true);
        }else{
            setMessage("Join the challenge by entering a valid room code!");
            setValidateCode(false);
        }
    };

    {   isValidRoom === false ?
        
    :
        (isRegistered === false ?
            // Username
            <div className='flex flex-col gap-3 p-4 bg-gray-200 rounded-lg w-96'>
                { !validateNickname ? <div> {message} </div>: <></> }
                <input className='py-2 text-xl text-center border-2 border-gray-700 rounded-lg' maxLength={15} type={"text"} placeholder={"Nickname"} value={nickname} onChange={e => setNickname(e.target.value)}/>
                <button className='w-full py-2 text-xl font-bold text-gray-200 bg-orange-700 rounded-lg' onClick={handleClickJoin}>
                    JOIN
                </button>
            </div>
        :
            // Confirm
            <div className='flex flex-col gap-3 p-4 bg-gray-200 rounded-lg w-96'>
                <div className='py-2 text-xl' >
                   { isStarted
                        ? <>The party started!</>
                        : <>The crew is waiting!</>
                    }
                </div>
                <div className='py-2 text-xl' >
                    { isStarted
                        ? <><b>{nickname}</b>, wanna catch up?</>
                        : <>Ready to join the party, <b>{nickname}</b>?</>
                    }
                </div>
                <button className='w-full py-2 text-xl font-bold text-gray-200 bg-gray-600 rounded-lg' onClick={handleGoBack}>
                    CHANGE NICKNAME
                </button>
                <Link to={'home'} className='w-full py-2 text-xl font-bold text-gray-200 bg-orange-700 rounded-lg'>
                    LET'S GO
                </Link>
            </div>
        )
}