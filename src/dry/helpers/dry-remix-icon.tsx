import React from "react";
import RemixIcon from "react-native-remix-icon";

type IconProps = {
  size?: number;
  color?: string;
};

export function HomeIcon({ size = 26, color = "#000" }: IconProps) {
  return <RemixIcon name="home-5-line" size={size} color={color} />;
}

export function AddIcon({ size = 30, color = "#000" }: IconProps) {
  return <RemixIcon name="add-circle-line" size={size} color={color} />;
}

export function UserIcon({ size = 26, color = "#000" }: IconProps) {
  return <RemixIcon name="user-3-line" size={size} color={color} />;
}
