/** @format */

import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 2rem;
`

export const Greeting = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`

export const AccountName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`

export const AccountDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  font-size: 1rem;
`
