import React from 'react';
import styled from 'styled-components';
import coroa from '../assets/coroa.png';
import hexagonPoint from '../assets/hexagon-point-blue.png';

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin-bottom: 32px;

  @media only screen and (max-width: 375px) {
    max-width: 360px;
  }
`;

const RankingVolunteerSkeleton = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 25px 48px 1fr;
  grid-gap: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  background: #fff;
  border-radius: 6px;
  min-width: 440px;

  @media only screen and (max-width: 420px) {
    min-width: initial;
    max-width: 360px;
  }

  &:not(:last-child) {
    margin-bottom: 8px;
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
        height: 20px;
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
  grid-template-columns: 25px 48px 1fr;
  grid-gap: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #5a5a5a;
  /* background: #e2f8ff; */
  background: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  > div {
    &:last-child {
      overflow: hidden;
      width: calc(100% - 20px);
      white-space: nowrap;

      span {
        &:first-child {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

const Volunteer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Points = styled.div`
  display: flex;
  align-items: center;

  span {
    &:first-child {
      color: #4eb9eb;
      font-weight: 400;
    }
  }
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
      /* border: 1px solid #dfe1e6; */
      box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
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

// const Point = styled.span`
//   display: inline-block;
//   position: relative;
//   overflow: hidden;
//   background: transparent;
//   width: 18px;
//   height: 18px;
//   transform: rotate(-30deg) skewX(30deg) scaleY(0.866);
//   margin-left: 5px;
//   box-shadow: 1px 1px 10px 1px rgba(41, 220, 222, 1);

//   &::before {
//     position: absolute;
//     right: 6.7%;
//     bottom: 0;
//     left: 6.7%;
//     top: 0;
//     transform: scaleY(1.155) skewX(-30deg) rotate(30deg);
//     content: '';
//     background-image: var(--bg-gradient);
//   }
// `;

const Ranking = ({ volunteers }) => {
  return (
    <RankingContainer>
      {!!volunteers?.length
        ? volunteers
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((volunteer, index) => (
              <RankingVolunteer key={volunteer.id}>
                <p>{index + 1}º </p>
                <Avatar size={48}>
                  {volunteer.avatarUrl ? (
                    <img
                      alt={volunteer.initials}
                      title={volunteer.fullName}
                      src={volunteer.avatarUrl}
                    />
                  ) : (
                    <strong title={volunteer.fullName}>
                      {volunteer.initials}
                    </strong>
                  )}
                  {index === 0 && <img src={coroa} alt="coroa" />}
                </Avatar>
                <Volunteer>
                  <span title={volunteer.fullName}>{volunteer.fullName}</span>
                  <Points>
                    <span>
                      {volunteer.points}{' '}
                      {/* {volunteer.points === 1 ? 'ponto' : 'pontos'} */}
                    </span>

                    <img
                      src={hexagonPoint}
                      width={32}
                      height={32}
                      alt="point"
                    />
                  </Points>
                </Volunteer>
              </RankingVolunteer>
            ))
        : [...Array(6)].map((_, index) => (
            <RankingVolunteerSkeleton key={index}>
              <p>{index + 1}º </p>
              <Avatar size={48}></Avatar>
              <Volunteer>
                <span></span>
                <span></span>
              </Volunteer>
            </RankingVolunteerSkeleton>
          ))}
    </RankingContainer>
  );
};

export default Ranking;
