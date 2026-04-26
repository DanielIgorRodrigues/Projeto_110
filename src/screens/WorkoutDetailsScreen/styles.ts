import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  centerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  label: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderColor: '#d1d5db',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    marginBottom: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  disabledButton: {
    backgroundColor: '#93c5fd',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    backgroundColor: '#e5e7eb',
    height: 1,
    marginVertical: 28,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyDescription: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
  },
  dangerButton: {
    alignItems: 'center',
    borderColor: '#dc2626',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dangerButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '700',
  },
});
