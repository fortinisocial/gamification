import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import api, {
  newBusinessAndFundRaisingTeamId,
  params,
} from '../../services/api';
import coroa from '../../assets/coroa.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;

  @media only screen and (max-width: 420px) {
    padding: 24px;
  }

  header {
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100px;
    padding: 0 24px;
    border-radius: 4px;
    color: #444;
    box-shadow: rgba(67, 66, 93, 0.03) 0px -2px 3px,
      rgba(67, 66, 93, 0.09) 0px 2px 3px;
    margin-bottom: 50px;
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
  max-width: 198px;
  border-radius: 4px;
  padding: 4px 6px;
  text-shadow: 1px 0px 4px rgba(0, 0, 0, 0.3);

  & + label {
    margin-left: 5px;
  }

  @media only screen and (max-width: 768px) {
    & + label {
      margin: 0 0 5px 5px;
    }
  }

  span {
    width: auto;
    font-size: 12px;
    font-weight: 600;
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

const Avatar = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: #dfe1e6;
  border-radius: 50%;
  cursor: default;

  & + div {
    margin-left: 10px;
  }

  span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #24dadc;
    font-weight: 600;
    color: #232323;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    bottom: 0;
    right: 0;
    font-size: 12px;
  }

  strong {
    font-size: 30px;
    color: #232323;
    text-transform: uppercase;
  }

  img {
    &:first-child {
      border-radius: 50%;
      border: 1px solid #dfe1e6;
      width: ${({ size }) => size}px;
      height: ${({ size }) => size}px;
    }

    &:nth-child(2) {
      position: absolute;
      width: ${({ size }) => size - 8}px;
      top: -14px;
      right: -5px;
      transform: rotate(18deg);
    }
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #232323;
  border: 2px solid #fff;
  border-radius: 6px;
  max-width: 500px;

  @media only screen and (max-width: 375px) {
    max-width: 360px;
  }
`;

const RankingVolunteerSkeleton = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20px 48px 1fr;
  grid-gap: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;

  &:not(:last-child) {
    border-bottom: 2px solid #fff;
  }

  div {
    &:first-of-type {
      background: linear-gradient(
        -90deg,
        #f6fbff 0%,
        #ecf1f5 50%,
        #e2e7eb 100%
      );
      animation: pulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      background-size: 400% 400%;
    }

    &:last-of-type {
      span {
        background: linear-gradient(
          -90deg,
          #f6fbff 0%,
          #ecf1f5 50%,
          #e2e7eb 100%
        );
        animation: pulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        background-size: 400% 400%;
        width: 200px;
        height: 16px;
        border-radius: 4px;
        margin-bottom: 4px;

        &:last-of-type {
          width: 90px;
        }
      }
    }
  }

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

const RankingVolunteer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20px 48px 1fr;
  grid-gap: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;

  &:not(:last-child) {
    border-bottom: 2px solid #fff;
  }

  div {
    &:last-child {
      overflow: hidden;
      width: calc(100% - 20px);
      white-space: nowrap;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const Points = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    &:last-child {
      color: #24dadc;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

const Dashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [cards, setCards] = useState([]);

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
          /^g-suite$|^slack$|^trello$|^meta$|^projeto$|^pex(.*?)ambev$|^tarefa$|^curso$|^palestra(.*?)aula$|^webinar(.*?)live$/gim,
        ),
      ),
    [],
  );

  const getLabels = useCallback(async () => {
    const response = await api.get(
      `/1/boards/${newBusinessAndFundRaisingTeamId}/labels`,
      { params },
    );

    const filteredLabels = filterLabels(response.data);

    return filteredLabels;
  }, [filterLabels]);

  const filterVolunteers = useCallback(
    volunteers =>
      volunteers.filter(
        volunteer => !volunteer.fullName.match(/maiara|bruno/gim),
      ),
    [],
  );

  const getVolunteers = useCallback(async () => {
    const response = await api.get(
      `/1/boards/${newBusinessAndFundRaisingTeamId}/members`,
      { params },
    );

    const members = filterVolunteers(response.data);

    for (const member of members) {
      const response = await api.get(`/1/members/${member.id}/avatarUrl`, {
        params,
      });
      const avatarUrl = response.data?._value
        ? `${response.data?._value}/60.png`
        : null;
      member.avatarUrl = avatarUrl;
    }

    return members;
  }, [filterVolunteers]);

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
    const response = await api.get('1/lists/5c3615842a10d38ebdcab317/cards', {
      params,
    });

    const completedCards = response.data;

    const [volunteersWithCounters, labelsWithCounters] = await getPoints(
      completedCards,
    );

    setLabels(labelsWithCounters);
    setVolunteers(volunteersWithCounters);
    setCards(completedCards);
  }, [getPoints]);

  useEffect(() => {
    getCompletedCards();
  }, [getCompletedCards]);

  return (
    <Container>
      <header>
        <h1>Novos Negócios e Mobilização de Recursos</h1>
      </header>
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
        <RankingContainer>
          {!!volunteers.length
            ? volunteers
                .sort((a, b) => (a.points < b.points ? 1 : -1))
                .map((volunteer, index) => (
                  <RankingVolunteer key={volunteer.id}>
                    <p>{index + 1}º </p>
                    <Avatar size={48}>
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
                      {index === 0 && <img src={coroa} alt="coroa" />}
                    </Avatar>
                    <Points>
                      <span>{volunteer.fullName}</span>
                      <span>
                        {volunteer.points}{' '}
                        {volunteer.points === 1 ? 'ponto' : 'pontos'}
                      </span>
                    </Points>
                  </RankingVolunteer>
                ))
            : [...Array(6)].map((_, index) => (
                <RankingVolunteerSkeleton key={index}>
                  <p>{index + 1}º </p>
                  <Avatar size={48}></Avatar>
                  <Points>
                    <span></span>
                    <span></span>
                  </Points>
                </RankingVolunteerSkeleton>
              ))}
        </RankingContainer>
      </section>
    </Container>
  );
};

export default Dashboard;
