import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import CopyButton from './CopyButton';

const Participants = ({ onClose , roomId}) => {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Fariha', status: 'waiting' },
    { id: 2, name: 'Maheera', status: 'waiting' },
    { id: 3, name: 'Laiba', status: 'waiting' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setParticipants(prevParticipants =>
      prevParticipants.map(participant => ({
        ...participant,
        hidden: !participant.name.toLowerCase().includes(query)
      }))
    );
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter((participant) => participant.id !== id));
  };

  const admitParticipant = (id) => {
    setParticipants(participants.map((participant) => {
      if (participant.id === id) {
        return { ...participant, status: 'joined' };
      }
      return participant;
    }));
  };


  const renderParticipant = (participant) => (
    <div key={participant.id} className="flex items-center justify-between px-4 py-3 rounded-lg bg-white space-x-6">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-600 text-lg" />
        </div>
        <div>{participant.name}</div>
      </div>
      {participant.status === 'waiting' && (
        <div className="space-x-2">
          <button
            className="px-2 py-1 bg-white border border-gray-500 text-black rounded-full hover:bg-red-500 hover:text-white hover:border-transparent"
            onClick={() => removeParticipant(participant.id)}
          >
            Remove
          </button>
          <button
            className="px-2 py-1 bg-white border border-gray-500 text-black rounded-full hover:bg-green-500 hover:text-white hover:border-transparent"
            onClick={() => admitParticipant(participant.id)}
          >
            Admit
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center">
        <FontAwesomeIcon
          className="text-black text-xl absolute top-4 right-4 cursor-pointer"
          icon={faClose}
          onClick={onClose}
        />
        <h1 className="font-bold text-2xl text-center text-black mb-4">Participants</h1>
        <div className="relative w-64 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-600 placeholder-gray-600 focus:outline-none focus:border-gray-400"
            placeholder="Search"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-3 text-gray-600 pointer-events-none"
          />
        </div>
        <div className="flex flex-col gap-4 w-full mb-4">
          <div className="text-black mb-2">Waiting Room</div>
          <div className="flex flex-col gap-4 w-full">
            {participants
              .filter((participant) => participant.status === 'waiting' && !participant.hidden)
              .map(renderParticipant)}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full mb-4">
          <div className="text-black mb-2">Joined</div>
          <div className="flex flex-col gap-4 w-full">
            {participants
              .filter((participant) => participant.status === 'joined' && !participant.hidden)
              .map(participant => (
                <div key={participant.id} className="flex items-center justify-between px-4 py-3 rounded-lg bg-white space-x-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                      <FontAwesomeIcon icon={faUser} className="text-gray-600 text-lg" />
                    </div>
                    <div>{participant.name}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <CopyButton roomId={roomId} />
      </div>
    </div>
  );
};

export default Participants;
