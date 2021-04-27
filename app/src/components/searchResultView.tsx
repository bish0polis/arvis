/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import path from 'path';
import { Core } from 'wf-creator-core';
import _ from 'lodash';
import SearchResultItem from './searchResultItem';
import { checkFileExists, isSupportedImageFormat } from '../utils';

type IProps = {
  demo: boolean;
  itemHeight: number;
  footerHeight: number;
  searchResult: any[];
  searchbarHeight: number;
  selectedItemIdx: number;
  startIdx: number;
  maxItemCount: number;
  onMouseoverHandler: Function;
  onDoubleClickHandler: Function;
};

const OuterContainer = styled.div`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const InnerContainer = styled.div`
  flex-direction: column;
  width: 100%;
`;

const searchResultView = (props: IProps) => {
  const {
    demo,
    footerHeight,
    itemHeight,
    maxItemCount,
    onDoubleClickHandler,
    onMouseoverHandler,
    searchbarHeight,
    searchResult,
    selectedItemIdx,
    startIdx
  } = props;

  const [contents, setContents] = useState<any>();

  const resultToRenders = useMemo(
    () => searchResult.slice(startIdx, startIdx + maxItemCount),
    [props]
  );

  const determineIconPath = async (
    command: any
  ): Promise<string | undefined> => {
    const workflowRootPath = `${Core.path.workflowInstallPath}${path.sep}installed${path.sep}${command.bundleId}`;
    const workflowDefaultIconPath = `${workflowRootPath}${path.sep}icon.png`;

    let iconPath;
    if (command.icon) {
      const iconExt = command.icon.path.split('.').pop();

      if (isSupportedImageFormat(iconExt)) {
        if (path.isAbsolute(command.icon.path)) {
          iconPath = command.icon.path;
        } else {
          iconPath = `${workflowRootPath}${path.sep}${command.icon.path}`;
        }
      }
    } else if (
      command.bundleId &&
      (await checkFileExists(workflowDefaultIconPath))
    ) {
      iconPath = workflowDefaultIconPath;
    }

    return iconPath;
  };

  useEffect(() => {
    if (!demo) {
      ipcRenderer.send('resize-searchwindow-height', {
        itemCount: searchResult.length,
        maxItemCount,
        itemHeight,
        searchbarHeight,
        footerHeight
      });
    }
  }, [searchResult]);

  useEffect(() => {
    Promise.all(
      _.map(resultToRenders, async (command: any, offset: number) => {
        const itemIdx = startIdx + offset;
        const iconPath = await determineIconPath(command);

        return (
          <InnerContainer key={`item-${offset}`}>
            <SearchResultItem
              selected={itemIdx === selectedItemIdx}
              title={command.title ? command.title : command.command}
              subtitle={command.subtitle}
              arg={command.arg}
              text={command.text}
              icon={iconPath}
              valid={command.valid}
              autocomplete={command.autocomplete}
              variables={command.variables}
              onMouseoverHandler={() => onMouseoverHandler(itemIdx)}
              onDoubleClickHandler={() => onDoubleClickHandler(itemIdx)}
            />
          </InnerContainer>
        );
      })
    ).then((result: any) => {
      setContents(result);
    });
  }, [resultToRenders]);

  return <OuterContainer>{contents}</OuterContainer>;
};

export default searchResultView;
