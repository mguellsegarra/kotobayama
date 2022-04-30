import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  ViewProps,
} from 'react-native';
import {strings} from '@library/services/i18nService';
import R, {Images, Fonts, Colors} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import WatchAdButton from '@library/components/button/watchAdButton';

import {hp, isAndroid} from '@library/services/deviceService';

type Props = {
  style: ViewProps | ViewProps[];
  type: PurchasePacksType;
};

export enum PurchasePacksType {
  WatchVideo,
  Tier1UnlockAds,
  Tier1,
  Tier2,
  Tier3,
}

interface PurchasePacksObject {
  image: string;
  price?: string;
  ribbon?: string;
  coins: number;
}

const purchasePacks = new Map<number, PurchasePacksObject>([
  [
    PurchasePacksType.WatchVideo,
    {
      image: Images.coin_pack1,
      coins: 100,
    },
  ],
  [
    PurchasePacksType.Tier1UnlockAds,
    {
      image: Images.coin_pack2,
      ribbon: 'popular',
      price: '4.99 EUR',
      coins: 500,
    },
  ],
  [
    PurchasePacksType.Tier1,
    {
      image: Images.coin_pack2,
      price: '3.99 EUR',
      coins: 500,
    },
  ],
  [
    PurchasePacksType.Tier2,
    {
      image: Images.coin_pack3,
      price: '5.99 EUR',
      coins: 700,
    },
  ],
  [
    PurchasePacksType.Tier3,
    {
      image: Images.coin_pack4,
      ribbon: 'bestOption',
      price: '7.99 EUR',
      coins: 2000,
    },
  ],
]);

export default class AddCoinsCell extends Component<Props> {
  getRibbon(ribbon: string | undefined) {
    if (!ribbon) {
      return null;
    }

    const image =
      ribbon === 'popular'
        ? Images.ribbon_red_cell_coins
        : Images.ribbon_blue_cell_coins;
    const text =
      ribbon === 'popular'
        ? strings('shopPopular').toUpperCase()
        : strings('shopBestOption').toUpperCase();
    const style =
      ribbon === 'popular'
        ? styles.cellRightTopImageTextRed
        : styles.cellRightTopImageTextBlue;

    return (
      <View style={styles.cellRightTop}>
        <ImageBackground
          source={R.img(image)}
          resizeMode={'contain'}
          style={styles.cellRightTopImage}>
          <Text style={[styles.cellRightTopImageText, style]}>{text}</Text>
        </ImageBackground>
      </View>
    );
  }

  getButton(price?: string) {
    switch (this.props.type) {
      case PurchasePacksType.WatchVideo:
        return <WatchAdButton />;
      default:
        return <RectButton text={price} type={RectButtonEnum.Green} />;
    }
  }

  render() {
    const options = purchasePacks.get(this.props.type);

    let imageWidth: any = styles.cellLeftImage;

    if (this.props.type === PurchasePacksType.Tier2) {
      imageWidth = [
        styles.cellLeftImage,
        {
          marginTop: hp('2%'),
          height: '180%',
          width: '180%',
        },
      ];
    } else if (this.props.type === PurchasePacksType.Tier1UnlockAds) {
      imageWidth = [
        styles.cellLeftImage,
        {
          marginTop: 0,
          height: '130%',
          width: '130%',
        },
      ];
    }

    return (
      <View style={this.props.style}>
        <View style={styles.cellLeft}>
          <View style={styles.cellLeftBottom}>
            <Image
              source={R.img(options?.image)}
              resizeMode={'contain'}
              style={imageWidth}
            />
          </View>
          <View style={styles.cellLeftTop}>
            <View style={styles.cellLeftTopFirst}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.coinsText}>
                {options?.coins + ' ' + strings('coins')}
              </Text>
            </View>
            {this.props.type === PurchasePacksType.Tier1UnlockAds ? (
              <View style={styles.cellLeftTopSecond}>
                <Text numberOfLines={1} style={styles.removeAdsText}>
                  {'+ ' + strings('removeAds')}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.cellRight}>
          {this.getRibbon(options?.ribbon)}
          <View style={styles.cellRightBottom}>
            {this.getButton(options?.price)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cellLeft: {
    flex: 1.5,
    height: '100%',
    flexDirection: 'column',
  },
  cellLeftTop: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLeftTopFirst: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLeftTopSecond: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('0.5%'),
  },
  removeAdsText: {
    color: 'white',
    fontFamily: Fonts.alata,
    fontSize: hp('1.4%'),
    textAlign: 'center',
  },
  cellLeftBottom: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLeftImage: {
    marginTop: hp('2%'),
    height: '130%',
    width: '130%',
  },
  cellRight: {
    flex: 2,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRightTop: {
    flex: 0.8,
    width: '100%',
  },
  cellRightTopImage: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: -4,
  },
  cellRightTopImageText: {
    fontFamily: Fonts.alata,
    fontSize: hp('1.5%'),
    marginTop: isAndroid ? 0 : hp('0.3%'),
  },
  cellRightTopImageTextRed: {
    color: Colors.ribbonRedText,
  },
  cellRightTopImageTextBlue: {
    color: Colors.ribbonBlueText,
  },
  cellRightMid: {
    flex: 2,
    width: '100%',
    backgroundColor: 'red',
  },
  cellRightBottom: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: hp('1%'),
    paddingTop: hp('0.4%'),
  },
  coinsText: {
    color: Colors.gold,
    fontFamily: Fonts.alata,
    fontSize: hp('2%'),
    textAlign: 'center',
  },
});
