import styled from 'styled-components'

import bg from '@/assets/img/playlist_bg.png'

export const PanelWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 46px;
  transform: translateX(-50%);
  width: 986px;
  height: 301px;
  color: #e2e2e2;

  .main {
    position: relative;
    display: flex;
    height: 260px;
    overflow: hidden;
    background: url(${bg}) -1014px 0 repeat-y;

    .image {
      position: absolute;
      left: 2px;
      top: -360px;
      width: 980px;
      height: auto;
      opacity: .2;
    }
  }
`
