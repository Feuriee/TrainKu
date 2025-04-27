import React from 'react';
import { ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import privacyPolicyContent from '../assets/PrivacyPolicyContent';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Markdown>{privacyPolicyContent}</Markdown>
    </ScrollView>
  );
}