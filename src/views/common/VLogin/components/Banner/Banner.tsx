import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import imgBackground from '@/assets/images/image1.png'
import imgForeground from '@/assets/images/image2.png'
import line from '@/assets/images/line.png'

import gear1 from '@/assets/images/gear1.png'
import gear2 from '@/assets/images/gear2.png'
import gear3 from '@/assets/images/gear3.png'
import gear4 from '@/assets/images/gear4.png'
import gear5 from '@/assets/images/gear5.png'
import bubble1 from '@/assets/images/bubble1.png'
import bubble2 from '@/assets/images/bubble2.png'
import bubble3 from '@/assets/images/bubble3.png'
import bubble4 from '@/assets/images/bubble4.png'

export interface Props {}

export interface State {}

export default class Banner extends React.Component<Props, State> {
  public render () {
    return (
      <Wrapper>
        <ColorBlock src={imgBackground} />
        <HouseImage src={imgForeground} />
        <Gear src={gear1} top='81.5%' left='76%' width='5.2%' />
        <Gear src={gear2} top='85.9%' left='81%' width='4.2%' />
        <Gear src={gear3} top='12.3%' left='30.5%' width='3.54%' />
        <Gear src={gear4} top='8.7%' left='33.7%' width='4.55%' />
        <Gear src={gear5} top='10.7%' left='38.5%' width='2.36%' />
        <BubbleUp src={bubble1} top='17%' left='42.66%' width='33%' />
        <BubbleUp src={bubble2} top='26%' left='33%' width='48.6%' />
        <BubbleDown src={bubble3} top='20.6%' left='41.7%' width='29.8%' />
        <BubbleDown src={bubble4} top='13.2%' left='28.6%' width='49.4%' />
        <Line src={line} top='43.6%' left='32.9%' scale={15} delay={1} />
        <Line src={line} top='47.6%' left='42.9%' scale={10} delay={2} />
        <Line src={line} top='51.2%' left='55.3%' scale={15} delay={1} />
        <Line src={line} top='48.6%' left='60.9%' scale={17} delay={2} />
        <Line src={line} top='43%' left='71.2%' scale={16} delay={3} />
      </Wrapper>
    )
  }
}

const rotate = keyframes`
  from {transform: rotate(0);}
  to {transform: rotate(360deg);}
`

const slideDown = keyframes`
  0%{transform:translateY(0)}
  50%{transform:translateY(20%)}
  100%{transform:translateY(0)}
`

const slideUp = keyframes`
  0%{transform:translateY(0)}
  50%{transform:translateY(-20%)}
  100%{transform:translateY(0)}
`

const fadeOut = keyframes`
 0%{transform:translateY(0); opacity:0;}
 20%{transform:translateY(-40%); opacity:1;}
 80%{transform:translateY(-160%); opacity: 1;}
 100%{transform:translateY(-200%); opacity: 0;}
`

const Wrapper = styled.div`
  position: absolute;
  width: 46%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`

const ColorBlock = styled.img`
  width: 100%;
`

const HouseImage = styled.img`
  position: absolute;
  top: 20%;
  left: 18%;
  width: 70%;
`

interface PartProps {
  top: string
  left: string
  width: string
}

const Gear = styled.img<PartProps>`
  position: absolute;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  width: ${(p) => p.width};
  animation: ${rotate} 3s ease-in-out infinite;
`

const BubbleUp = styled.img<PartProps>`
  position: absolute;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  width: ${(p) => p.width};
  animation: ${slideUp} 6s ease-in-out infinite;
`

const BubbleDown = styled.img<PartProps>`
  position: absolute;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  width: ${(p) => p.width};
  animation: ${slideDown} 6s ease-in-out infinite;
`

interface LineProps {
  top: string
  left: string
  delay: number
  scale: number
}

const Line = styled.img<LineProps>`
  position: absolute;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  width: 0.3%;
  opacity: 0;
  height: ${(p) => p.scale + '%'};
  animation: ${fadeOut} 3s ${(p) => p.delay}s linear infinite;
`
