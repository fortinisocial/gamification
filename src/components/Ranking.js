import React from 'react';
import styled from 'styled-components';
import coroa from '../assets/coroa.png';

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
                      alt={volunteer.fullName}
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
  );
};

export default Ranking;
