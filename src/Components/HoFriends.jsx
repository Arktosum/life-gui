import React from 'react'

// This place stores every person as a card.
// Each card has a Picture, Name , DOB and brief description
// Clicking on card will lead to a full page about them

// CRUD friend
/* friend info:
        1. Name
        2. DOB
        3. contact (email/ phone)
        3. How do you know him/her?
        4. things you know about him/her
        5. what are they doing?/where are they at?
*/


export default function HoFriends() {
  return (
    <div className="grid place-items-center">
        <div>
            <input type="text" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10'>
            <FriendCard/>
            <FriendCard/>
            <FriendCard/>
            <FriendCard/>
            <FriendCard/>
            <FriendCard/>
        </div>
    </div>
  )
}


function calcAge(dob){
    let [day,month,year] = dob.split('-')
    let date = new Date();
    let thisYear = date.getFullYear();
    return thisYear - year
}


function FriendCard(props){
    
    let item = {
        name : "Chad",
        dob : "01-05-2002",
        contact : {
            phone : ['+919223923923'],
            socials : []
        }
    }
    return (<>
        <div className='w-[200px]'>
            <img src="./chad.jpg" alt="" className='w-full aspect-[3/4]'/>
            <div className='flex flex-col justify-center items-center'>
                <div className="text-white">{item.name}</div>
                <div className="text-white">🎂{item.dob}</div>
                <div className='text-white'>{calcAge(item.dob)} Years old</div>
                <div className="text-white">📞{item.contact.phone[0]}</div>
            </div>
        </div>
    </>)
}