import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Ranking from '../../components/Ranking';
import api, { params } from '../../services/api';
import { getBoardByName } from '../../utils/trello';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;

  header {
    /* background: #fff; */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* height: 100px; */
    /* padding: 0 24px;
    border-radius: 4px; */
    color: #7a7a7a;
    /* box-shadow: rgba(67, 66, 93, 0.03) 0px -2px 3px,
      rgba(67, 66, 93, 0.09) 0px 2px 3px; */
    /* margin-bottom: 50px; */
    color: #e2f8ff;

    h1 {
      font-size: 48px;
    }
  }

  @media only screen and (max-width: 420px) {
    padding: 24px;
  }

  section {
    & + section {
      margin-top: 20px;
    }

    &.cards {
      p {
        font-size: 40px;
        text-align: center;
      }
    }

    &.ranking {
      margin-top: 40px;

      h2 {
        font-size: 30px;
      }
    }

    h1,
    h2 {
      margin-bottom: 10px;
    }

    h2 {
      text-align: center;
    }
  }
`;

const LabelsContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  color: #fff;
  background-color: ${({ color }) => color};
  text-overflow: ellipsis;
  text-shadow: none;
  white-space: nowrap;
  width: auto;
  height: 48px;
  line-height: 16px;
  min-width: 40px;
  max-width: max-content;
  border-radius: 4px;
  padding: 4px 6px;
  text-shadow: 1px 0px 4px rgba(0, 0, 0, 0.3);

  & + label {
    /* margin-left: 5px; */
    margin: 0 0 5px 5px;
  }

  @media only screen and (max-width: 768px) {
    & + label {
      margin: 0 0 5px 5px;
    }
  }

  span {
    width: auto;
    font-size: 12px;
    font-weight: 400;
    color: #232323;
    line-height: 22px;
    text-shadow: none;
  }
`;

const LabelSkeleton = styled.label`
  background: linear-gradient(-90deg, #f6fbff 0%, #ecf1f5 50%, #e2e7eb 100%);
  height: 48px;
  border-radius: 4px;
  padding: 4px 6px;
  width: 60px;
  background-size: 400% 400%;
  animation: pulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }

  & + label {
    margin-left: 5px;
  }

  @media only screen and (max-width: 768px) {
    & + label {
      margin: 0 0 5px 5px;
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dashboard = ({ teamName }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState();

  const labelColor = {
    blue: '#0079BF',
    lime: '#61BD4F',
    sky: '#00C2E0',
    orange: '#FF9F1A',
    yellow: '#F2D600',
    red: '#EB5A46',
    purple: '#c377e0',
    pink: '#ff78cb',
    black: '#344563',
    green: '#61bd4f',
  };

  const filterLabels = useCallback(
    labels =>
      labels.filter(label =>
        label.name.match(
          /^g-suite$|^slack$|^trello$|^meta$|^projeto$|^pex(.*?)ambev$|^tarefa$|^curso$|^palestra(.*?)aula$|^webinar(.*?)live$|^palestrar(.*?)talks$|^presença(.*?)talks$|^presença(.*?)workshops$|^presença(.*?)reuniões$/gim,
        ),
      ),
    [],
  );

  const getLabels = useCallback(async () => {
    if (!board?.id) return;
    const response = await api.get(`/1/boards/${board.id}/labels`, { params });

    const filteredLabels = filterLabels(response.data);

    return filteredLabels;
  }, [filterLabels, board]);

  const filterVolunteers = useCallback(
    (volunteers, boardName) => {
      if (boardName.match(/Administração/gi)) {
        return volunteers.filter(
          volunteer =>
            !volunteer.fullName.match(/maiara|bruno|césar|larissa|luiza/gim) &&
            volunteer.confirmed,
        );
      }
      if (boardName.match(/Tecnologia/gi)) {
        return volunteers.filter(
          volunteer =>
            volunteer.fullName.match(/isabella|bruno/gim) &&
            volunteer.confirmed,
        );
      }
      if (boardName.match(/Mobilização/gi)) {
        return volunteers.filter(
          volunteer =>
            !volunteer.fullName.match(
              /maiara|bruno|césar|larissa|nitielle|Rayssa|lucas/gim,
            ) && volunteer.confirmed,
        );
      }
      if (boardName.match(/Gente/gi)) {
        return volunteers.filter(
          volunteer =>
            volunteer.fullName.match(/larissa|cleo|mariana/gim) &&
            volunteer.confirmed,
        );
      }
      if (boardName.match(/Comunicação/gi)) {
        return volunteers.filter(
          volunteer =>
            volunteer.fullName.match(
              /nitielle|get[uú]lio|c[eé]sar|paula|j[úu]lia|raquel/gim,
            ) && volunteer.confirmed,
        );
      }
      if (boardName.match(/Operações/gi)) {
        return volunteers.filter(
          volunteer =>
            volunteer.fullName.match(
              /fl[aá]via|gilberto|j[ée]ssica|juan|lana|ronaldo|thais/gim,
            ) && volunteer.confirmed,
        );
      }
      if (boardName.match(/Jurídico/gi)) {
        return volunteers.filter(
          volunteer =>
            volunteer.fullName.match(/lucas|rayssa/gim) && volunteer.confirmed,
        );
      }
      return volunteers;
    },

    [],
  );

  const getVolunteers = useCallback(async () => {
    if (!board?.id) return;
    const response = await api.get(`/1/boards/${board.id}/members`, {
      params: {
        ...params,
        fields: 'fullName,avatarUrl,confirmed,initials',
      },
    });

    const members = filterVolunteers(response.data, board.name);

    for (const member of members) {
      member.avatarUrl = member.avatarUrl ? `${member.avatarUrl}/60.png` : null;
    }

    return members;
  }, [filterVolunteers, board]);

  const getPointsByLabel = useCallback(label => {
    if (label.match(/^g-suite$/gim)) return 10;
    if (label.match(/^slack$/gim)) return 10;
    if (label.match(/^trello$/gim)) return 10;
    if (label.match(/^meta$/gim)) return 25;
    if (label.match(/^projeto$/gim)) return 20;
    if (label.match(/^pex(.*?)ambev$/gim)) return 15;
    if (label.match(/^tarefa$/gim)) return 3;
    if (label.match(/^curso$/gim)) return 10;
    if (label.match(/^palestra(.*?)aula$/gim)) return 5;
    if (label.match(/^webinar(.*?)live$/gim)) return 2;
    if (label.match(/^palestrar(.*?)talks$/gim)) return 10;
    if (label.match(/^presença(.*?)talks$/gim)) return 5;
    if (label.match(/^presença(.*?)workshops$/gim)) return 5;
    if (label.match(/^presença(.*?)reuniões$/gim)) return 2;
    return 0;
  }, []);

  const getPoints = useCallback(
    async cards => {
      const currentVolunteers = await getVolunteers();
      const currentLabels = await getLabels();

      let membersId = [];
      let labelsId = [];

      for (const card of cards) {
        labelsId = [...labelsId, card.idLabels].flat(Infinity);
        membersId = [...membersId, card.idMembers].flat(Infinity);

        for (const label of currentLabels) {
          label.volunteers = {};
          if (card.idLabels.includes(label.id)) {
            label['volunteersId'] = [
              label?.volunteersId || [],
              ...card.idMembers,
            ].flat(Infinity);
          }
        }
      }

      let counterMembers = {};
      membersId.forEach(
        memberId =>
          (counterMembers[memberId] = (counterMembers[memberId] || 0) + 1),
      );
      let counterLabels = {};
      labelsId.forEach(
        labelId => (counterLabels[labelId] = (counterLabels[labelId] || 0) + 1),
      );

      for (const label of currentLabels) {
        if (label.volunteersId && !!label.volunteersId.length) {
          label.volunteersId.forEach(voluntId => {
            label.volunteers[voluntId] = (label.volunteers[voluntId] || 0) + 1;
          });
          delete label.volunteersId;
        }

        for (const volunteer of currentVolunteers) {
          volunteer['pointsBylabel'] = {
            ...(volunteer['pointsBylabel'] || {}),
          };
          if (label.volunteers[volunteer.id]) {
            volunteer.pointsBylabel[label.name.toLowerCase()] =
              getPointsByLabel(label.name) * label.volunteers[volunteer.id];
          }

          volunteer.points = Object.values(volunteer.pointsBylabel).reduce(
            (a, b) => a + b,
            0,
          );
        }
      }

      let labelsWithCounter = [...currentLabels];
      for (const labelWithCounter of labelsWithCounter) {
        labelWithCounter['counter'] = counterLabels[labelWithCounter.id] || 0;
      }

      return [currentVolunteers, labelsWithCounter];
    },
    [getLabels, getPointsByLabel, getVolunteers],
  );

  const getCompletedCards = useCallback(async () => {
    const response = await api.get(`1/lists/${board.completedList.id}/cards`, {
      params: { ...params, fields: 'idMembers,idLabels' },
    });

    const completedCards = response.data;

    const [volunteersWithCounters, labelsWithCounters] = await getPoints(
      completedCards,
    );

    setLabels(labelsWithCounters);
    setVolunteers(volunteersWithCounters);
    setCards(completedCards);
  }, [board, getPoints]);

  const addCompletedListToBoard = board => {
    if (!board?.lists?.length) return;

    let completedList = board.lists
      .filter(list => list.name.match(/conclu[ií]do/i))
      .find(list => list.name.includes('2020'));

    setBoard({ ...board, completedList });
  };

  useEffect(() => {
    async function getBoard() {
      try {
        const board = await getBoardByName(teamName);
        if (board) {
          addCompletedListToBoard(board);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getBoard();
  }, [teamName]);

  useEffect(() => {
    if (board?.id && board?.completedList) getCompletedCards();
  }, [board, getCompletedCards]);

  return (
    <Container>
      <header>
        <h1>{teamName}</h1>
      </header>
      {/* <section>
        <h2>Voluntários</h2>
        <AvatarContainer>
          {!!volunteers.length
            ? volunteers.map(volunteer => (
                <Avatar key={volunteer.id} size={60}>
                  <span title="Cards concluídos">{volunteer.counter}</span>
                  {volunteer.avatarUrl ? (
                    <img
                      alt={volunteer.fullName}
                      title={volunteer.fullName}
                      src={volunteer.avatarUrl}
                    />
                  ) : (
                    <strong title={volunteer.fullName}>
                      {volunteer.fullName?.charAt(0)}
                    </strong>
                  )}
                </Avatar>
              ))
            : 'Carregando..'}
        </AvatarContainer>
      </section>
      <section className="cards">
        <h2>Cartões concluídos</h2>
        <p>{cards.length}</p>
      </section>
      <section>
        <h2>Total de Etiquetas</h2>
        <CardsContainer>
          {labels.map(label => (
            <span key={label.id}>
              {label.name}: {label.counter}
            </span>
          ))}
        </CardsContainer>
      </section> */}
      <section className="ranking">
        <h2>Ranking</h2>
        <Ranking volunteers={volunteers} />
      </section>
      <section>
        <h2>Etiquetas</h2>
        <LabelsContainer>
          {!!labels.length
            ? labels.map((label, index) => (
                <React.Fragment key={label.id}>
                  <Label color={labelColor[label.color]}>
                    {label.name}
                    <span>
                      {getPointsByLabel(label.name)}
                      {getPointsByLabel(label.name) === 1
                        ? ' ponto'
                        : ' pontos'}{' '}
                    </span>
                  </Label>
                </React.Fragment>
              ))
            : [...Array(10)].map((_, index) => <LabelSkeleton key={index} />)}
        </LabelsContainer>
      </section>
    </Container>
  );
};

export default Dashboard;
